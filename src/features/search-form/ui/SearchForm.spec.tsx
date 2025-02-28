import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

describe('SearchForm component', () => {
  const name = 'rick';
  const pathname = '/';

  const setupRouterMock = (
    query: { name: string | undefined } = { name: '' },
    push = vi.fn()
  ) => {
    mockUseRouter.mockReturnValue({
      query,
      push,
    });
  };

  it('should render correctly with router.query.name as default value', () => {
    setupRouterMock({ name: undefined });

    render(<SearchForm />);

    const inputElement = screen.getByRole<HTMLInputElement>('input');

    expect(inputElement).toHaveValue('');
  });

  it('should properly handle form submission with trimmed value', () => {
    const value = '  morty      ';
    const mockPush = vi.fn();

    setupRouterMock({ name }, mockPush);

    render(<SearchForm />);

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    expect(formElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(name);

    fireEvent.input(inputElement, { target: { value } });
    fireEvent.submit(formElement);

    expect(mockPush).toHaveBeenCalledWith({
      pathname,
      search: `?name=${value.trim()}`,
    });
  });

  it('should properly handle form submission with no changes', () => {
    const mockPush = vi.fn();

    setupRouterMock({ name }, mockPush);

    render(<SearchForm />);

    const formElement = screen.getByRole<HTMLFormElement>('search-form');

    fireEvent.submit(formElement);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should properly handle form submission with empty value', () => {
    const mockPush = vi.fn();

    setupRouterMock({ name }, mockPush);

    render(<SearchForm />);

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    fireEvent.input(inputElement, { target: { value: null } });
    fireEvent.submit(formElement);

    expect(mockPush).toHaveBeenCalledWith({
      pathname,
      search: '',
    });
  });
});
