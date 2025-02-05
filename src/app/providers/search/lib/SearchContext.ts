import { createContext } from 'react';
import { Character } from '@/shared/api/characters';

export interface SearchProviderValue {
  isLoading: boolean;
  characters: Character[];
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchProviderValue>({
  isLoading: false,
  characters: [],
  error: null,
  query: '',
  setQuery: () => {},
});
