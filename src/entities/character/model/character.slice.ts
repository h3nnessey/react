import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character, CharacterId } from './character.model';

export interface SelectedCharactersState {
  characters: Character[];
}

const initialState: SelectedCharactersState = {
  characters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  selectors: {
    getFavorites: state => state.characters,
    isFavorite: (state, id: CharacterId) =>
      !!state.characters.find(character => character.id === id),
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
  },
});
