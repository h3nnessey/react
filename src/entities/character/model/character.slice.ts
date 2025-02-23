import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CharacterId } from './character.model';

export interface SelectedCharacter {
  id: CharacterId;
}

export interface SelectedCharactersState {
  ids: CharacterId[];
}

const initialState: SelectedCharactersState = {
  ids: [],
};

export const charactersSlice = createSlice({
  name: 'charactersSlice',
  initialState,
  selectors: {
    getSelectedCharacters: state => state.ids,
    isSelected: (state, id: CharacterId) => state.ids.includes(id),
  },
  reducers: {
    select: (state, { payload: id }: PayloadAction<CharacterId>) => {
      state.ids.push(id);
    },
    unselect: (state, action: PayloadAction<CharacterId>) => {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});
