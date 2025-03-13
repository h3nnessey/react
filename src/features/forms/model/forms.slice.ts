import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { COUNTRIES, type Country } from '@/shared/constants';
import type { FormEntity, FormId } from './forms.model';

interface FormsState {
  entities: Record<FormId, FormEntity | undefined>;
  ids: FormId[];
  lastSubmittedFormId: FormId | null;
  countries: Country[];
}

const initialState: FormsState = {
  entities: {},
  ids: [],
  lastSubmittedFormId: null,
  countries: COUNTRIES,
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  selectors: {
    forms: state => state.ids.map(id => state.entities[id]),
    countries: state => state.countries,
    isLastSubmitted: state => (id: FormId) => state.lastSubmittedFormId === id,
  },
  reducers: {
    addForm(state, action: PayloadAction<Omit<FormEntity, 'id'>>) {
      const id = nanoid();
      const entity: FormEntity = { id, ...action.payload };

      state.entities[id] = entity;
      state.ids.push(id);
      state.lastSubmittedFormId = id;
    },
  },
});
