import { Outlet } from 'react-router';
import { Header, SearchResults } from '@/widgets';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <SearchResults />
        <Outlet />
      </main>
    </>
  );
};
