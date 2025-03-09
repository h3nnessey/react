import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination component', () => {
  const pages = 2;
  const currentPage = 1;
  const onPageChange = vi.fn();

  it('should not render if there is only one page', () => {
    render(
      <Pagination pages={1} currentPage={currentPage} onPageChange={() => {}} />
    );

    const paginationElement = screen.queryByRole<HTMLDivElement>('pagination');

    expect(paginationElement).toBeNull();
  });

  it('should render if there are more than one page', () => {
    render(
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    const paginationElement = screen.queryByRole<HTMLDivElement>('pagination');

    expect(paginationElement).toBeInTheDocument();
  });

  it('should call onPageChange with the correct page number', () => {
    render(
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    const secondPageButton = screen.getByRole<HTMLButtonElement>('button', {
      name: String(pages),
    });

    fireEvent.click(secondPageButton);

    expect(onPageChange).toHaveBeenCalledWith(pages);
  });
});
