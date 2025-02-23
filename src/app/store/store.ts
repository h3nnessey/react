import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { characterApi } from '@/entities/character';

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
