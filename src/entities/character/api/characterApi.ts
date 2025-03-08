import type { Character } from '../model';

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

export interface RequestResult<T> {
  data: T;
  error: string | null;
}

export type GetFilteredCharactersReturnType = Awaited<
  ReturnType<typeof getFilteredCharacters>
>;

export type GetCharacterReturnType = Awaited<
  ReturnType<typeof getCharacterById>
>;

export const getCharacterById = async (
  id: Query
): Promise<Character | null> => {
  const url = new URL(`${BASE_URL}/${id}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};

export const getFilteredCharacters = async (
  name = '',
  page = '1'
): Promise<GetCharactersOkResponse | null> => {
  const url = new URL(`${BASE_URL}/?page=${page}`);

  if (name) {
    url.searchParams.set('name', name.toString());
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};
