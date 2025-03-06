import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import NotFoundPage from '@/pagess/404';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('NotFoundPage component', () => {
  it('should render correctly', () => {
    mockUseRouter.mockReturnValue({
      query: {},
      push: vi.fn(),
    });

    renderWithProviders(<NotFoundPage />);

    const errorElement = screen.getByRole<HTMLDivElement>('error-message');

    expect(errorElement).toBeInTheDocument();
  });
});
