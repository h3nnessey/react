import { SearchContextComponent } from '@/app/providers/search';
import { SearchForm } from '@/features/search-form';
import styles from './Header.module.scss';

export class Header extends SearchContextComponent {
  render() {
    const { setQuery, query, isLoading } = this.context;

    return (
      <header className={styles.header}>
        <SearchForm
          defaultValue={query}
          disabled={isLoading}
          onSubmit={setQuery}
        />
      </header>
    );
  }
}
