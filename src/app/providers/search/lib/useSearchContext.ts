import { useContext } from 'react';
import { SearchContext } from './SearchContext';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  return context;
};
