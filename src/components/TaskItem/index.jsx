import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './TaskItem.module.scss';

export default function TaskItem({ task, onEdit, onDelete, isDeleting }) {
    const badgeClass = clsx({
        [styles.badgeLow]: task.priority === 'Low',
        [styles.badgeMedium]: task.priority === 'Medium',
        [styles.badgeHigh]: task.priority === 'High',
    });

    return (
        <li className={styles.item}>
            <label className={styles.left}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                        onEdit({ ...task, completed: !task.completed })
                    }
                />
                <span
                    className={clsx(styles.title, {
                        [styles.done]: task.completed,
                    })}
                >
                    {task.name}
                </span>
            </label>

            <div className={styles.right}>
                <span className={clsx(styles.badge, badgeClass)}>
                    {task.priority}
                </span>
                <Link
                    to={`/${task.id}/edit`}
                    className={clsx(styles.btn, {
                        [styles.disabled]: isDeleting,
                    })}
                >
                    ✎
                </Link>
                <button
                    onClick={onDelete}
                    className={clsx(styles.btn, {
                        [styles.disabled]: isDeleting,
                    })}
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}
