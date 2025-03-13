import { NavLink, Outlet } from 'react-router';
import { AppRoutes } from '@/app/router/routes';
import { classnames } from '@/shared/lib/styling';
import styles from './MainPage.module.scss';
import { useAppSelector } from '@/app/store';
import { formsSlice } from '@/features/forms/model/forms.slice';

export const MainPage = () => {
  const countries = useAppSelector(formsSlice.selectors.countries);

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
        {countries.map(country => (
          <p key={country.code}>{country.name}</p>
        ))}
      </main>
    </>
  );
};
