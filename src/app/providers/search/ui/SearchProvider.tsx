import { useState, useEffect, ReactNode } from 'react';
import { CharactersApi } from '@/shared/api/characters';
import { SearchProviderValue, SearchContext } from '../lib/SearchContext';

interface SearchProviderProps {
  children?: ReactNode;
}

type SearchProviderState = Omit<SearchProviderValue, 'setQuery'>;

const LS_KEY = 'h3nnessey-search';

const INITIAL_STATE: SearchProviderState = {
  isLoading: false,
  characters: [],
  error: null,
  query: '',
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [state, setState] = useState<SearchProviderState>({
    ...INITIAL_STATE,
    query: window.localStorage.getItem(LS_KEY) || '',
  });

  const setQuery = (query: string) => {
    setState(current => ({ ...current, query }));
  };

  const updateCharacters = async (query: string) => {
    window.localStorage.setItem(LS_KEY, query);

    setState({
      isLoading: true,
      characters: [],
      error: null,
      query,
    });

    const results = await CharactersApi.getCharacters({ name: query });

    if (results.success) {
      setState({
        isLoading: false,
        characters: results.data.results,
        error: null,
        query,
      });
    } else {
      setState({
        isLoading: false,
        characters: [],
        error: results.error,
        query,
      });
    }
  };

  useEffect(() => {
    updateCharacters(state.query);
  }, [state.query]);

  return (
    <SearchContext.Provider value={{ ...state, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
