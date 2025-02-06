import { useSearchContext } from '@/app/providers/search';
import { SearchForm } from '@/features/search-form';
import styles from './Header.module.scss';

export const Header = () => {
  const { updateQuery, query } = useSearchContext();
  // no reason to use search context with items inside here, just change the search params state instead
  return (
    <header className={styles.header}>
      <SearchForm
        defaultValue={query}
        disabled={false}
        onSubmit={updateQuery}
      />
    </header>
  );
};
