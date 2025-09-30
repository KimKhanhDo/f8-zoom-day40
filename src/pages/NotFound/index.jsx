import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFound() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.badge}>404</div>
                <h1 className={styles.title}>PAGE NOT FOUND</h1>
                <p className={styles.desc}>
                    This page is outside of the universe
                </p>
                <div className={styles.actions}>
                    <Link
                        to="/todo"
                        className={styles.btn}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
