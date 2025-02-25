import type { Character } from '../model';
import { processApiError, processError } from './deserializeError';

export const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export interface GetCharactersOkResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export type Query = string | string[] | undefined | null;

export interface GetCharactersParams {
  id: Query;
  name: Query;
  page: Query;
}

export type RequestResult<T> =
  | { success: false; error: string }
  | { success: true; data: T };

export const getCharacters = async ({
  id,
  name,
  page,
}: GetCharactersParams) => {
  const result = {
    characters: await getFilteredCharacters({ name, page }),
    character: id ? await getCharacterById(id.toString()) : null,
  };

  return result;
};

const getCharacterById = async (
  id: string
): Promise<RequestResult<Character>> => {
  const url = new URL(`${BASE_URL}/${id}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return processApiError(data);
    }

    return {
      success: true as const,
      data,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};

const getFilteredCharacters = async ({
  name,
  page = '1',
}: Omit<GetCharactersParams, 'id'>): Promise<
  RequestResult<GetCharactersOkResponse>
> => {
  const url = new URL(`${BASE_URL}/?page=${page}`);

  if (name) {
    url.searchParams.set('name', name.toString());
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return processApiError(data);
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};
