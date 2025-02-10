import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLocation, useNavigate } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryParams } from '@/shared/api/characters';
import { Pagination, PaginationProps } from './Pagination';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe('Pagination', () => {
  const mockLocation = {
    pathname: '/',
    search: `?${QueryParams.Page}=1`,
    state: '',
    key: '',
    hash: '',
  };

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderPagination = (props: Partial<PaginationProps> = {}) => {
    const defaultProps = {
      pages: 10,
      currentPage: 1,
      disabled: false,
      limit: 5,
    };

    render(<Pagination {...defaultProps} {...props} />);
  };

  const expectPagesToBeRendered = (pages: string[]) => {
    pages.forEach(page => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });
  };

  it('should render correct amount of pages', () => {
    renderPagination();

    expectPagesToBeRendered(['1', '2', '3', '4', '5', '...', '10']);
  });

  it('should navigate on button click', () => {
    renderPagination();

    fireEvent.click(screen.getByText('2'));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: `${QueryParams.Page}=2`,
    });
  });

  it('should disable buttons while loading', () => {
    renderPagination({ disabled: true });

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should render correct pages near the start', () => {
    renderPagination({ currentPage: 2 });

    expectPagesToBeRendered(['1', '2', '3', '4', '5', '...', '10']);
  });

  it('should render correct pages near the end', () => {
    renderPagination({ currentPage: 9 });

    expectPagesToBeRendered(['1', '...', '6', '7', '8', '9', '10']);
  });
});
