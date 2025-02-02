import { Character, CharactersApi } from '@/shared/api/characters';
import { createContext, Component, type ReactNode } from 'react';

interface SearchProviderProps {
  children?: ReactNode;
}

interface SearchProviderState {
  query: string;
  characters: Character[];
  isLoading: boolean;
  error: string | null;
}

interface SearchProviderValue extends SearchProviderState {
  setQuery: (query: string) => void;
}

const LS_KEY = 'h3nnessey-search';

const INITIAL_STATE: SearchProviderState = {
  query: window.localStorage.getItem(LS_KEY) || '',
  characters: [],
  isLoading: false,
  error: null,
};

const INITIAL_CONTEXT_VALUE: SearchProviderValue = {
  ...INITIAL_STATE,
  setQuery: () => {},
};

export const SearchContext = createContext<SearchProviderValue>(
  INITIAL_CONTEXT_VALUE
);

export class SearchProvider extends Component<
  SearchProviderProps,
  SearchProviderState
> {
  state: SearchProviderState = INITIAL_STATE;

  componentDidMount() {
    this.updateCharacters();
  }

  componentDidUpdate(
    _prevProps: Readonly<SearchProviderProps>,
    prevState: Readonly<SearchProviderState>
  ) {
    if (prevState.query !== this.state.query) {
      this.updateCharacters();
    }
  }

  private updateCharacters = () => {
    const { query } = this.state;

    window.localStorage.setItem(LS_KEY, query);

    this.setState({ isLoading: true, error: null, characters: [] });

    CharactersApi.getCharacters({ name: query }).then(res => {
      if (res.success) {
        this.setState({
          error: null,
          characters: res.data.results,
          isLoading: false,
        });
      } else {
        this.setState({
          error: res.error,
          characters: [],
          isLoading: false,
        });
      }
    });
  };

  setQuery = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <SearchContext.Provider
        value={{ ...this.state, setQuery: this.setQuery }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
