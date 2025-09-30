import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './NavBar.module.scss';

function NavBar() {
    return (
        <nav className={styles.nav}>
            <NavLink
                to="/todo"
                className={({ isActive }) =>
                    isActive
                        ? clsx(styles.navLink, styles.activePrimary)
                        : styles.navButton
                }
            >
                Todo App
            </NavLink>
            <a
                href="/redux.html"
                target="_blank"
                className={styles.navButton}
            >
                Redux Demo
            </a>
        </nav>
    );
}
export default NavBar;
