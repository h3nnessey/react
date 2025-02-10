import { useEffect, useState } from 'react';
import type { GetCharacterRequestState } from '../model';
import { getCharacter } from '../base';

const initialValue: GetCharacterRequestState = {
  isLoading: false,
  data: null,
  error: null,
};

export const useCharacter = (id: number): GetCharacterRequestState => {
  const [state, setState] = useState<GetCharacterRequestState>(initialValue);

  useEffect(() => {
    const controller = new AbortController();

    setState(prev => ({
      ...prev,
      error: null,
      isLoading: true,
    }));

    getCharacter(id, controller.signal).then(({ data, error }) => {
      setState({
        isLoading: false,
        data,
        error,
      });
    });

    return () => {
      controller.abort();
    };
  }, [id]);

  return state;
};
