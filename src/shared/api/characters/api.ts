import type { GetCharactersResult } from './model';
import {
  type CharactersQueryParams,
  CHARACTERS_URL,
  processApiError,
  processError,
} from './base';

export const getCharacters = async (
  params: CharactersQueryParams = { page: 1 }
): Promise<GetCharactersResult> => {
  try {
    const url = new URL(CHARACTERS_URL);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value.toString());
      }
    });

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
