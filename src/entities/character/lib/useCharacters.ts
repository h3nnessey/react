import { useEffect, useState } from 'react';
import {
  getCharacters,
  type GetCharactersRequestState,
} from '@/shared/api/characters';

const initialValue: GetCharactersRequestState = {
  isLoading: false,
  data: null,
  error: null,
};

export const useCharacters = (
  name = '',
  page = 1
): GetCharactersRequestState => {
  const [state, setState] = useState<GetCharactersRequestState>(initialValue);

  useEffect(() => {
    const controller = new AbortController();

    setState(prev => ({
      ...prev,
      error: null,
      isLoading: true,
    }));

    getCharacters({ name, page }, controller.signal).then(({ data, error }) => {
      setState({
        isLoading: false,
        data,
        error,
      });
    });

    return () => {
      controller.abort();
    };
  }, [name, page]);

  return state;
};
