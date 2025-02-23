import { useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { characterApi } from '@/entities/character/api/characterApi';
import { charactersSlice } from '@/entities/character/model';

const reducer = combineReducers({
  [characterApi.reducerPath]: characterApi.reducer,
  [charactersSlice.name]: charactersSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
