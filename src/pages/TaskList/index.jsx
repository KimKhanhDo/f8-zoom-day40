import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/libs/react-redux';
import {
    ADD_TASK,
    DELETE_TASK,
    SEARCH_TASK,
    SET_ERROR,
    SET_LOADING,
    SET_TASKS,
    UPDATE_TASK,
} from '@/store/reducers/taskReducer';
import styles from './TaskList.module.scss';
import TaskItem from '@/components/TaskItem';
import TaskForm from '@/components/TaskForm';
import Loading from '@/components/Loading';

const API = 'http://localhost:3000/tasks';

function TaskList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState(null);
    const [searchText, setSearchText] = useState('');

    const tasks = useSelector((state) => {
        const query = (state.searchQuery ?? '').toLowerCase();
        if (!query) return state.tasks;

        const filterTasks = state.tasks.filter((task) =>
            task.name.toLowerCase().includes(query)
        );

        return filterTasks;
    });
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        let timeoutId;

        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        fetch(`${API}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("There's error while fetching data!");
                }

                return res.json();
            })
            .then((data) => {
                timeoutId = setTimeout(() => {
                    dispatch({
                        type: SET_TASKS,
                        payload: data,
                    });

                    dispatch({ type: SET_LOADING, payload: false });
                    dispatch({ type: SET_ERROR, payload: null });
                }, 1000);
            })
            .catch((error) => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.message,
                });

                dispatch({ type: SET_LOADING, payload: false });
            });

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [dispatch]);

    const handleEditTask = async (task) => {
        try {
            const res = await fetch(`${API}/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: task.completed }),
            });

            if (!res.ok) throw new Error('Error happened while updating.');

            const updatedTask = await res.json();

            dispatch({
                type: UPDATE_TASK,
                payload: updatedTask,
            });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    };

    const handleDeleteTask = async (task) => {
        if (!confirm(`Are you sure you want to delete '${task.name}'?`)) return;

        setDeletingId(task.id);

        try {
            const res = await fetch(`${API}/${task.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Error happened while deleting.');

            dispatch({
                type: DELETE_TASK,
                payload: task.id,
            });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        } finally {
            setDeletingId(null);
        }
    };

    const handleCreateNewTask = async (task, redirect = false) => {
        dispatch({ type: SET_LOADING, payload: true });

        const payload = {
            name: task.name,
            priority: task.priority,
            completed: false,
        };

        try {
            const res = await fetch(`${API}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok)
                throw new Error('Error happened while creating new task.');

            const createdTask = await res.json();

            dispatch({
                type: ADD_TASK,
                payload: createdTask,
            });

            dispatch({ type: SET_ERROR, payload: null });

            if (redirect) navigate('/');
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };

    const handleSearchTextChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        dispatch({ type: SEARCH_TASK, payload: value });
    };

    const showEmpty = tasks.length === 0;
    const showError = !loading && error;

    return (
        <section className={styles.wrap}>
            <div className={styles.card}>
                <h2 className={styles.title}>TODO APP with REDUX</h2>

                {/* Search */}
                <div className={styles.block}>
                    <label className={styles.label}>Search</label>
                    <div className={styles.inputWithIcon}>
                        <input
                            value={searchText}
                            placeholder="Type keywords..."
                            onChange={handleSearchTextChange}
                        />
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                </div>

                {/* Task List */}
                {loading && <Loading />}

                {showError && <div className={styles.error}>⚠️ {error}</div>}

                {showEmpty ? (
                    <ul className={styles.list}>
                        <li className={styles.empty}>There is no task...</li>
                    </ul>
                ) : (
                    <ul className={styles.list}>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={() => handleDeleteTask(task)}
                                isDeleting={task.id === deletingId}
                            />
                        ))}
                    </ul>
                )}

                {/* Task Form – Add task */}
                <div className={styles.footer}>
                    <TaskForm
                        initialData={{ name: '', priority: '' }}
                        submitText="Create"
                        onSubmit={(task) => handleCreateNewTask(task, false)}
                        isLoading={loading}
                        href="/new"
                        linkTo="Open full form →"
                    />
                </div>
            </div>
        </section>
    );
}

export default TaskList;
