import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import { ThemeProvider } from '@/shared/ui/theme';
import { Header } from './Header';

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
    renderWithProviders(
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
