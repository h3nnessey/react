'use client';
import { useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/entities/character/model';

const reducer = combineReducers({
  [charactersSlice.name]: charactersSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: reducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const wrapper = createWrapper<AppStore>(makeStore);
