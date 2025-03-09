import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@/shared/ui/theme';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

describe('Header component', () => {
  it('should render correctly', () => {
    mockUseRouter.mockReturnValue({
      query: {},
    });

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const headerElement = screen.getByRole<HTMLHeadElement>('header');
    const switchElement = screen.getByRole<HTMLLabelElement>('switch');
    const formElement = screen.getByRole<HTMLFormElement>('search-form');

    expect(headerElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });
});
