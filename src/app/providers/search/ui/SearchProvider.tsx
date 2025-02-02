import { Character, CharactersApi } from '@/shared/api/characters';
import { createContext, Component, type ReactNode } from 'react';

interface SearchProviderProps {
  children?: ReactNode;
}

interface SearchProviderState {
  query: string;
  items: Character[];
  isLoading: boolean;
  setQuery: (value: string) => void;
}

const INITIAL_VALUE = {
  query: 'rick',
  items: [],
  isLoading: false,
  setQuery: () => {},
};

export const SearchContext = createContext<SearchProviderState>(INITIAL_VALUE);

export class SearchProvider extends Component<
  SearchProviderProps,
  SearchProviderState
> {
  state: SearchProviderState = {
    ...INITIAL_VALUE,
    setQuery: (newQuery: string) => this.setState({ query: newQuery }),
  };

  componentDidMount() {
    CharactersApi.getCharacters({ name: this.state.query }).then(res => {
      this.setState({ items: res.success ? res.data.results : [] });
    });
  }

  componentDidUpdate(
    prevProps: Readonly<SearchProviderProps>,
    prevState: Readonly<SearchProviderState>
  ) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });
      CharactersApi.getCharacters({ name: this.state.query }).then(res => {
        this.setState({
          items: res.success ? res.data.results : [],
          isLoading: false,
        });
      });
    }
  }

  render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
