import styles from './Loading.module.scss';

function Loading({ label = 'Loading...' }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <span className={styles.spinner} />
                <span className={styles.text}>{label}</span>
            </div>
        </div>
    );
}

export default Loading;
