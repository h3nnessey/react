import { createContext, Component, type ReactNode } from 'react';

interface SearchContextValue {
  search: string;
  setSearch: (value: string) => void;
}

interface SearchProviderProps {
  children?: ReactNode;
}

const INITIAL_VALUE = {
  search: '123',
  setSearch: (value: string) => {
    console.log(value);
  },
};

export const SearchContext = createContext<SearchContextValue>(INITIAL_VALUE);

export class SearchProvider extends Component<SearchProviderProps> {
  render() {
    return (
      <SearchContext.Provider value={INITIAL_VALUE}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
