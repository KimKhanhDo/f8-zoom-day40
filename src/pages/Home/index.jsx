import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home() {
    return (
        <section className={styles.home}>
            <h1 className={styles.title}>
                Redux Core & React-Redux Integration
            </h1>

            <div className={styles.grid}>
                <Link
                    to="/todo"
                    className={styles.card}
                >
                    <h2>🧾 Todo App</h2>
                    <p>Manage todo tasks with Redux.</p>
                </Link>

                <a
                    href="/redux.html"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.card}
                >
                    <h2>🧪 Redux Demo</h2>
                    <p>Counter demo in public folder.</p>
                </a>
            </div>
        </section>
    );
}
