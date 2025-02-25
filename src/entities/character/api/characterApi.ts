import type { Character } from '../model';
import { processApiError, processError } from './helpers';

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

export type GetCharactersReturnType = Awaited<ReturnType<typeof getCharacters>>;

export type GetCharacterReturnType = Awaited<
  ReturnType<typeof getCharacterById>
>;

export const getCharacters = async ({
  id,
  name,
  page,
}: GetCharactersParams) => {
  let character = null;
  const characters = await getFilteredCharacters({ name, page });

  if (id) {
    character = await getCharacterById(id.toString());
  }

  return {
    characters,
    character,
  };
};

const getCharacterById = async (id: string) => {
  const url = new URL(`${BASE_URL}/${id}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return processApiError(data);
    }

    return {
      data: data as Character,
      error: null,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};

const getFilteredCharacters = async ({
  name,
  page = '1',
}: Omit<GetCharactersParams, 'id'>) => {
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
      error: null,
      data: data as GetCharactersOkResponse,
    };
  } catch (error: unknown) {
    return processError(error);
  }
};
