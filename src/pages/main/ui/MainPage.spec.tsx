import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { mockCharacter } from '@/__tests__';
import { characterApi } from '@/entities/character/api/characterApi';
import { MainPage } from './MainPage';
import styles from './MainPage.module.scss';

vi.mock('@/widgets/Header', () => ({
  Header: vi.fn(() => <div data-testid="header">Header</div>),
}));

vi.mock('@/widgets/SearchResults', () => ({
  SearchResults: vi.fn(() => (
    <div data-testid="search-results-container">SearchResults</div>
  )),
}));

vi.mock('@/entities/character/CharactersFlyout', () => ({
  CharactersFlyout: vi.fn(() => (
    <div data-testid="characters-flyout">CharactersFlyout</div>
  )),
}));

global.URL.createObjectURL = vi.fn(() => 'mock-url');

const mockStore = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    characters: () => ({
      characters: [mockCharacter],
    }),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

describe('MainPage', () => {
  it('shows Header, SearchResults, and CharactersFlyout on the page', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('search-results-container')).toBeInTheDocument();
    expect(screen.getByTestId('characters-flyout')).toBeInTheDocument();
  });

  it('has a main section with the correct class', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveClass(styles.main);
  });
});
