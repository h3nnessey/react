import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character, CharacterId } from './character.model';

export interface SelectedCharactersState {
  characters: Character[];
  isLoading: boolean;
}

const initialState: SelectedCharactersState = {
  characters: [],
  isLoading: false,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  selectors: {
    getFavorites: state => state.characters,
    isFavorite: (state, id: CharacterId) =>
      !!state.characters.find(character => character.id === id),
    isLoading: state => state.isLoading,
  },
  reducers: {
    addToFavorites: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<CharacterId>) => {
      state.characters = state.characters.filter(
        character => character.id !== action.payload
      );
    },
    clearFavorites: () => {
      return initialState;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});
