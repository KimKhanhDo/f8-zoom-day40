import { Link } from 'react-router-dom';

import styles from './TodoApp.module.scss';
import AppRoutes from '@/components/AppRoutes';
import NavBar from './components/NavBar';

function TodoApp() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link to="/">
                        <h1 className={styles.brand}>Redux Core</h1>
                    </Link>
                    <NavBar />
                </div>
            </header>

            <main className={styles.main}>
                <AppRoutes />
            </main>

            <footer className={styles.footer}>
                © {new Date().getFullYear()} Task Management – REDUX
            </footer>
        </div>
    );
}
export default TodoApp;
