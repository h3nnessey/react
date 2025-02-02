import { createContext, Component, type ReactNode } from 'react';

const INITIAL_VALUE = 'search context';

export const SearchContext = createContext(INITIAL_VALUE);

interface SearchProviderProps {
  children?: ReactNode;
}

export class SearchProvider extends Component<SearchProviderProps> {
  render() {
    return (
      <SearchContext.Provider value={INITIAL_VALUE}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
