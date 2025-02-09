import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';

const mockUseLocalStorage = vi.hoisted(() => vi.fn());

vi.mock('@/shared/lib/storage', () => ({
  useLocalStorage: mockUseLocalStorage,
}));

describe('SearchForm', () => {
  const mockSetSearch = vi.fn();
  const mockedValue = 'Morty Smith';

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocalStorage.mockReturnValue(['', mockSetSearch]);
  });

  it('should set the input value from local storage', () => {
    mockUseLocalStorage.mockReturnValue([mockedValue, mockSetSearch]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchForm />} />
        </Routes>
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText<HTMLInputElement>(
      'Search something...'
    );
    expect(inputElement.value).toBe(mockedValue);
  });

  it('should save to local storage on click', () => {
    const newValue = 'Rick Sanchez';

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchForm />} />
        </Routes>
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search something...');
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: newValue } });
    fireEvent.click(buttonElement);

    expect(mockSetSearch).toHaveBeenCalledWith(newValue);
  });
});
