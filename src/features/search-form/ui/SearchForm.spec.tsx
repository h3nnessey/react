import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';
import { SearchForm } from './SearchForm';

const mockUseRouter = vi.hoisted(() => vi.fn());
const mockUseSearchParams = vi.hoisted(() => vi.fn());
const mockUseSearchNavigation = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: mockUseRouter,
    useSearchParams: mockUseSearchParams,
  };
});

vi.mock('@/providers/search-navigation-provider', async () => {
  const mod = await import('@/providers/search-navigation-provider');
  return {
    ...mod,
    useSearchNavigation: mockUseSearchNavigation,
  };
});

describe('SearchForm component', () => {
  const name = 'rick';
  let mockNavigate: Mock;

  const renderSearchForm = () => {
    return render(
      <SearchNavigationProvider>
        <SearchForm />
      </SearchNavigationProvider>
    );
  };

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ name }));
    mockUseSearchNavigation.mockReturnValue({
      search: name,
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    expect(formElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(name);
  });

  it('should properly handle form submission with trimmed value', () => {
    const value = '  morty      ';

    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    fireEvent.input(inputElement, { target: { value } });
    fireEvent.submit(formElement);

    expect(mockNavigate).toHaveBeenCalledWith({ name: value.trim() });
  });

  it('should properly handle form submission with no changes', () => {
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');

    fireEvent.submit(formElement);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should properly handle form submission with empty value', () => {
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    fireEvent.input(inputElement, { target: { value: '' } });
    fireEvent.submit(formElement);

    expect(mockNavigate).toHaveBeenCalledWith({ name: '' });
  });
});
