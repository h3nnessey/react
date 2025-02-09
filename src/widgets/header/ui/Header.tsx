import { SearchForm } from '@/features/search-form';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <SearchForm />
    </header>
  );
};
