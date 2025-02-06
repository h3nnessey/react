import { useState, type ReactNode } from 'react';
import { SearchContext } from '../lib/SearchContext';

interface SearchProviderProps {
  children?: ReactNode;
}

const LS_KEY = 'h3nnessey-search';

export const SearchProvider = ({ children }: SearchProviderProps) => {
  // page will be used for pagination in the future
  // observe search params by using useSearchParams
  const [query, setQuery] = useState(window.localStorage.getItem(LS_KEY) || '');

  const updateQuery = (query: string) => {
    window.localStorage.setItem(LS_KEY, query);
    setQuery(query);
  };

  return (
    <SearchContext.Provider value={{ query, updateQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
