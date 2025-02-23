import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../model';

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

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCharacterById: builder.query<Character, string>({
      query: id => `/${id}`,
    }),
    getCharacters: builder.query<
      GetCharactersOkResponse,
      { page?: number; name?: string }
    >({
      query: ({ page, name }) => {
        return {
          url: '/',
          params: {
            page: page ?? 1,
            name: name || undefined,
          },
        };
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } = characterApi;
