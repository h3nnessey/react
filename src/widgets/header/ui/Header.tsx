import { SearchContextComponent } from '@/app/providers/search';
import { SearchForm } from '@/features/search-form';
import { Button } from '@/shared/ui';
import styles from './Header.module.scss';

interface HeaderState {
  hasError: boolean;
}

export class Header extends SearchContextComponent<unknown, HeaderState> {
  state: HeaderState = {
    hasError: false,
  };

  private handleThrowErrorClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test Error');
    }

    const { setQuery, query, isLoading } = this.context;

    return (
      <header className={styles.header}>
        <SearchForm
          defaultValue={query}
          disabled={isLoading}
          onSubmit={setQuery}
        />
        <Button text="Throw Error" onClick={this.handleThrowErrorClick} />
      </header>
    );
  }
}
