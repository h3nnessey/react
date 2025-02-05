import { useContext } from 'react';
import { SearchContext } from '../ui/SearchProvider';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  return context;
};
