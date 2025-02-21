import { SearchForm } from '@/features/search-form';
import { useTheme } from '@/shared/ui/theme';
import styles from './Header.module.scss';

export const Header = () => {
  const { ThemeSwitcher } = useTheme();

  return (
    <header className={styles.header} role="header">
      <ThemeSwitcher />
      <SearchForm />
    </header>
  );
};
