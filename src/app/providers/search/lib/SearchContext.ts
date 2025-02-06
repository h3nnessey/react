import { createContext } from 'react';

export interface SearchProviderValue {
  query: string;
  updateQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchProviderValue>({
  query: '',
  updateQuery: () => {},
});
