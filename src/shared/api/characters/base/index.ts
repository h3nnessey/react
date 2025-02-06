import { CharactersQueryParams, GetCharactersResult } from '../model';

export const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

export const ERROR_MESSAGE = 'Something went wrong';

export const createURL = (
  path: string,
  params: Record<string, string | number>
) => {
  const url = new URL(path);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value.toString());
    }
  });

  return url;
};

// refactor asap
export const getCharacters = async (
  params: CharactersQueryParams,
  signal?: AbortSignal
): Promise<GetCharactersResult> => {
  const url = createURL(CHARACTERS_URL, params);

  let result: GetCharactersResult = {
    error: null,
    data: null,
  };

  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!response.ok) {
      result = {
        error: data.error,
        data: null,
      };
    } else {
      result = {
        error: null,
        data,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      result = {
        error: null,
        data: null,
      };
    } else {
      result = {
        error: error instanceof Error ? error.message : ERROR_MESSAGE,
        data: null,
      };
    }
  }

  return result;
};
