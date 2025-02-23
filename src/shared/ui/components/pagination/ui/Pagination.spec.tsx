import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Pagination } from './Pagination';
import styles from '../../button/ui/Button.module.scss';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  const renderPagination = (props = {}) => {
    const defaultProps = {
      pages: 10,
      currentPage: 1,
      onPageChange: mockOnPageChange,
      disabled: false,
      limit: 5,
      className: '',
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct number of buttons', () => {
    renderPagination();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7);
  });

  it('should correctly call onPageChange', () => {
    renderPagination();

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should disable all buttons when disabled', () => {
    renderPagination({ disabled: true });

    const buttons = screen.getAllByRole('button');

    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should render active page', () => {
    renderPagination({ currentPage: 3 });

    const buttons = screen.getAllByRole('button');
    expect(buttons[2]).toHaveClass(styles.active);
  });

  it('should render ellipsis', () => {
    renderPagination({ pages: 10, currentPage: 1, limit: 5 });

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent('1');
    expect(buttons[1]).toHaveTextContent('2');
    expect(buttons[2]).toHaveTextContent('3');
    expect(buttons[3]).toHaveTextContent('4');
    expect(buttons[4]).toHaveTextContent('5');
    expect(buttons[5]).toHaveTextContent('...');
    expect(buttons[6]).toHaveTextContent('10');
  });

  it('should not be rendered if no pages', () => {
    const { container } = renderPagination({ pages: 0 });

    expect(container).toBeEmptyDOMElement();
  });
});
