import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue = '') => {
  const [state, setState] = useState<string>(() => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
};
