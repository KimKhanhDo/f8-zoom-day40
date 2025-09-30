import { Link, useNavigate } from 'react-router-dom';

import styles from './NewTask.module.scss';
import TaskForm from '@/components/TaskForm';
import { useDispatch, useSelector } from '@/libs/react-redux';
import { ADD_TASK, SET_ERROR, SET_LOADING } from '@/store/reducers/taskReducer';

const API = 'http://localhost:3000/tasks';

function NewTask() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);

    const handleCreateNewTask = async (task) => {
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

            navigate('/todo');
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.head}>
                    <h2>Create New Task</h2>
                    <Link
                        to="/"
                        className={styles.back}
                    >
                        ← Back to list
                    </Link>
                </div>

                <TaskForm
                    initialData={{ name: '', priority: '' }}
                    onSubmit={handleCreateNewTask}
                    submitText="Create"
                    isLoading={loading}
                />
            </div>
        </section>
    );
}

export default NewTask;
