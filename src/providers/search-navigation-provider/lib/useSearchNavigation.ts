import { useContext } from 'react';
import { SearchNavigationContext } from './SearchNavigationContext';

export const useSearchNavigation = () => {
  const context = useContext(SearchNavigationContext);

  if (!context) {
    throw new Error(
      'useSearchNavigation must be used within a SearchNavigationProvider'
    );
  }

  return context;
};
