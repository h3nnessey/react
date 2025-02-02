import { SearchContextComponent } from '@/app/providers/search';
import { SearchForm } from '@/features/search-form';

export class Header extends SearchContextComponent {
  render() {
    const { setQuery, query, isLoading } = this.context;

    return (
      <header>
        <SearchForm
          defaultValue={query}
          disabled={isLoading}
          onSearch={setQuery}
        />
      </header>
    );
  }
}
