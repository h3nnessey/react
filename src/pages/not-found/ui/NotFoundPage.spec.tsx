import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
