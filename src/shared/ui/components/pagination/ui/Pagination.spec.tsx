import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import { Pagination } from './Pagination';

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

describe('Pagination component', () => {
  const pages = 2;
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseSearchNavigation.mockReturnValue({
      navigate: mockNavigate,
      page: '1',
    });
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

  it('should call navigate on click', () => {
    renderWithProviders(<Pagination pages={pages} />);

    const secondButtonElement = screen.getByRole<HTMLButtonElement>('button', {
      name: pages.toString(),
    });

    fireEvent.click(secondButtonElement);

    expect(mockNavigate).toHaveBeenCalledWith({ page: pages });
  });
});
