import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import { Pagination } from './Pagination';

const mockUseSearchParams = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useSearchParams: mockUseSearchParams,
  };
});

describe('Pagination component', () => {
  const pages = 2;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render if there is only one page', () => {
    renderWithProviders(<Pagination pages={1} />);

    const paginationElement = screen.queryByRole<HTMLDivElement>('pagination');

    expect(paginationElement).toBeNull();
  });

  it('should render if there are more than one page', () => {
    renderWithProviders(<Pagination pages={pages} />);

    const paginationElement = screen.getByRole<HTMLDivElement>('pagination');

    expect(paginationElement).toBeInTheDocument();
  });

  it('should call dispatch with setIsLoading(true) on button click', () => {
    const { store } = renderWithProviders(<Pagination pages={pages} />);

    const secondButtonElement = screen.getByRole<HTMLButtonElement>('button', {
      name: pages.toString(),
    });

    fireEvent.click(secondButtonElement);

    expect(store.getState().characters.isLoading).toBe(true);
  });
});
