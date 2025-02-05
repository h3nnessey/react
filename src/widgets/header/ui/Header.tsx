import { useSearchContext } from '@/app/providers/search';
import { SearchForm } from '@/features/search-form';
import styles from './Header.module.scss';

export const Header = () => {
  const { setQuery, query, isLoading } = useSearchContext();

  return (
    <header className={styles.header}>
      <SearchForm
        defaultValue={query}
        disabled={isLoading}
        onSubmit={setQuery}
      />
    </header>
  );
};
