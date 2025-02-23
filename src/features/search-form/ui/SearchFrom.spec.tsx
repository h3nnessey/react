import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';

const mockUseSearchParams = vi.hoisted(() => vi.fn());
const mockUseNavigate = vi.hoisted(() => vi.fn());

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: mockUseSearchParams,
    useNavigate: mockUseNavigate,
  };
});

describe('SearchForm', () => {
  const mockSetParams = vi.fn();
  const mockParams = new URLSearchParams('name=rick');

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearchParams.mockReturnValue([mockParams, mockSetParams]);
    mockUseNavigate.mockReturnValue(mockUseNavigate);
  });

  it('should set the input value from search params', () => {
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

    expect(inputElement.value).toBe('rick');
  });

  it('should navigate on form submission', () => {
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

    expect(mockUseNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: `?name=${newValue}`,
    });
  });

  it('should not navigate if the search query has not changed', () => {
    render(
      <MemoryRouter initialEntries={['/?name=rick']}>
        <Routes>
          <Route path="/" element={<SearchForm />} />
        </Routes>
      </MemoryRouter>
    );

    const buttonElement = screen.getByText('Search');

    fireEvent.click(buttonElement);

    expect(mockUseNavigate).not.toHaveBeenCalledWith({
      pathname: '/',
      search: `?name=rick`,
    });
  });

  it('should clear the search parameter if the input is empty', () => {
    render(
      <MemoryRouter initialEntries={['/?name=rick']}>
        <Routes>
          <Route path="/" element={<SearchForm />} />
        </Routes>
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search something...');
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    expect(mockUseNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '',
    });
  });
});
