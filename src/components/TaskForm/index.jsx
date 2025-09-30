import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './TaskForm.module.scss';
import Loading from '@/components/Loading';

function TaskForm({
    initialData = {},
    onSubmit,
    submitText,
    isLoading,
    href,
    linkTo,
}) {
    const actionBtn = href ? (
        <Link
            to={href}
            className={styles.linkMore}
        >
            {linkTo}
        </Link>
    ) : (
        <Link to="/todo">
            <button className={clsx(styles.btn, styles.danger)}>Cancel</button>
        </Link>
    );

    const [name, setName] = useState('');
    const [priorityState, setPriorityState] = useState('');
    const [titleError, setTitleError] = useState(null);
    const [priorityError, setPriorityError] = useState(null);
    const inputRef = useRef(null);

    // Auto focus
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Đồng bộ khi initialData thay đổi
    useEffect(() => {
        setName(initialData?.name ?? '');
        setPriorityState(initialData?.priority ?? '');
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskName = name.trim();

        if (taskName === '') {
            setTitleError('🚨 Title can not be empty!');
            inputRef.current.focus();
            return;
        }

        if (!priorityState) {
            setPriorityError('🚨 Please choose a priority!');
            return;
        }

        setTitleError(null);
        setPriorityError(null);

        // giữ id khi Edit
        onSubmit({
            ...initialData,
            name: taskName,
            priority: priorityState,
        });
    };

    return isLoading ? (
        <Loading />
    ) : (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {/* Title */}
            <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input
                    ref={inputRef}
                    placeholder="Enter task name..."
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (titleError) setTitleError(null);
                    }}
                />
                {titleError && <div className={styles.error}>{titleError}</div>}
            </div>

            {/* Choose by priority */}
            <div className={styles.block}>
                <label className={styles.label}>Priority</label>
                <div className={styles.selectWrap}>
                    <select
                        value={priorityState || ''}
                        onChange={(e) => {
                            setPriorityState(e.target.value);
                            if (priorityError) setPriorityError(null);
                        }}
                    >
                        <option
                            value=""
                            disabled
                        >
                            Choose Task Priority
                        </option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                    <span className={styles.chev}>▾</span>
                </div>
                {priorityError && (
                    <div className={styles.error}>{priorityError}</div>
                )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button className={clsx(styles.btn, styles.primary)}>
                    {submitText}
                </button>
                {actionBtn}
            </div>
        </form>
    );
}

export default TaskForm;
