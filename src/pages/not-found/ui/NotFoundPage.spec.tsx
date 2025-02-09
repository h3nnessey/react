import { describe, expect, it, vi } from 'vitest';
import { useNavigate } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage, MESSAGE } from './NotFoundPage';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFoundPage Component', () => {
  it('should render error message', () => {
    render(<NotFoundPage />);

    const messageElement = screen.getByText(MESSAGE);
    expect(messageElement).toBeInTheDocument();
  });

  it('should call navigate on button click', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(<NotFoundPage />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
