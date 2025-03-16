import { NavLink, Outlet } from 'react-router';
import { AppRoutes } from '@/app/router/routes';
import { classnames } from '@/shared/lib/styling';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <header>
        <nav className={styles.nav}>
          <ul>
            {Object.values(AppRoutes).map(route => (
              <li key={route.path}>
                <NavLink
                  className={({ isActive }) =>
                    classnames(styles.link, { [styles.active]: isActive })
                  }
                  to={route.path}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
