import type {
  CharactersQueryParams,
  GetCharacterResult,
  GetCharactersResult,
} from '../model';

export const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

export const ERROR_MESSAGE = 'Something went wrong';

export const createURL = (
  path: string,
  params: Record<string, string | number> = {}
) => {
  const url = new URL(path);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value.toString());
    }
  });

  return url;
};

export const generateErrorObject = (message: string) => {
  return {
    data: null,
    error: message.includes('signal') ? null : message,
  };
};

export const processApiError = (error: unknown) => {
  let message = ERROR_MESSAGE;

  if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    message = error.error;
  }

  return generateErrorObject(message);
};

export const processError = (error: unknown) => {
  const message = error instanceof Error ? error.message : ERROR_MESSAGE;

  return generateErrorObject(message);
};

export const getCharacters = async (
  params: CharactersQueryParams,
  signal?: AbortSignal
): Promise<GetCharactersResult> => {
  const url = createURL(CHARACTERS_URL, params);

  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!response.ok) {
      return processApiError(data);
    }

    return {
      data,
      error: null,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};

export const getCharacter = async (
  id: number,
  signal?: AbortSignal
): Promise<GetCharacterResult> => {
  const url = createURL(`${CHARACTERS_URL}/${id}`);

  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!response.ok) {
      return processApiError(data);
    }

    return {
      data,
      error: null,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};
