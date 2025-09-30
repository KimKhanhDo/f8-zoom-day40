import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './EditTask.module.scss';
import TaskForm from '@/components/TaskForm';
import { useDispatch, useSelector } from '@/libs/react-redux';
import {
    SET_ERROR,
    SET_LOADING,
    UPDATE_TASK,
} from '@/store/reducers/taskReducer';

const API = 'http://localhost:3000/tasks';

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [task, setTask] = useState({});
    const loading = useSelector((state) => state.loading);

    useEffect(() => {
        let timeoutId;

        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        fetch(`${API}/${id}`)
            .then((res) => {
                if (res.status === 404) {
                    navigate('/todo');
                    return;
                }

                if (!res.ok)
                    throw new Error("There's error while fetching data!");

                return res.json();
            })
            .then((data) => {
                timeoutId = setTimeout(() => {
                    setTask(data);
                    dispatch({ type: SET_LOADING, payload: false });
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: SET_LOADING, payload: false });
            });

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [dispatch, id, navigate]);

    const handleEditTask = async (task) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (!res.ok) throw new Error('Error happened while updating.');

            const updatedTask = await res.json();
            console.log('🚀 ~ handleEditTask ~ updatedTask:', updatedTask);

            dispatch({
                type: UPDATE_TASK,
                payload: updatedTask,
            });

            navigate('/todo');
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.head}>
                    <h2>Edit Task #{id}</h2>
                    <Link
                        to="/"
                        className={styles.back}
                    >
                        ← Back
                    </Link>
                </div>

                <TaskForm
                    initialData={task}
                    submitText="Update"
                    onSubmit={handleEditTask}
                    isLoading={loading}
                />
            </div>
        </section>
    );
}

export default EditTask;
