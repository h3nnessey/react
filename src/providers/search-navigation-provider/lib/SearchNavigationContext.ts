'use client';
import { createContext } from 'react';

export interface NavigateParams {
  page?: string | number;
  name?: string;
  preserveParams?: boolean;
}

export interface SearchNavigationContextType {
  search: string;
  page: number;
  isLoading: boolean;
  navigate: (params: NavigateParams) => void;
}

export const SearchNavigationContext =
  createContext<SearchNavigationContextType | null>(null);
