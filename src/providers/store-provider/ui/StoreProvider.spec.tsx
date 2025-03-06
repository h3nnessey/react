import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { makeStore, type AppStore } from '@/store';
import { charactersSlice } from '@/entities/character';
import { StoreProvider } from './StoreProvider';

vi.mock('@/store', () => ({
  makeStore: vi.fn(() => ({
    dispatch: vi.fn(),
    getState: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn(),
  })),
}));

describe('StoreProvider component', () => {
  let mockStore: AppStore;

  beforeEach(() => {
    mockStore = configureStore({
      reducer: {
        [charactersSlice.name]: charactersSlice.reducer,
      },
    });

    vi.mocked(makeStore).mockReturnValue(mockStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should create and reuse the same store on re-renders', () => {
    const { rerender } = render(
      <StoreProvider>
        <div data-testid="child">Child Component</div>
      </StoreProvider>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);

    rerender(
      <StoreProvider>
        <div data-testid="child">Child Component</div>
      </StoreProvider>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);
  });
});
