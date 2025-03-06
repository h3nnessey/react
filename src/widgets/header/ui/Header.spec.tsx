import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@/shared/ui/theme';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(() => new URLSearchParams()),
  };
});

describe('Header component', () => {
  it('should render correctly', () => {
    render(
      <SearchNavigationProvider>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </SearchNavigationProvider>
    );

    const headerElement = screen.getByRole<HTMLHeadElement>('header');
    const switchElement = screen.getByRole<HTMLLabelElement>('switch');
    const formElement = screen.getByRole<HTMLFormElement>('search-form');

    expect(headerElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });
});
