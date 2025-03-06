import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';
import {
  CharacterCardList,
  type CharacterCardListProps,
} from './CharacterCardList';

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: vi.fn(),
    usePathname: vi.fn(() => '/1'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
  };
});

describe('CharacterCardList component', () => {
  const props: CharacterCardListProps = {
    data: {
      results: Array.from({ length: 10 }, () => characterMock),
      info: {
        count: 10,
        pages: 1,
        next: null,
        prev: null,
      },
    },
    error: null,
  };

  it('should render correctly with no data', () => {
    const message = 'Error message';

    renderWithProviders(
      <SearchNavigationProvider>
        <CharacterCardList data={null} error={message} />
      </SearchNavigationProvider>
    );

    const characterCardListElement = screen.queryByRole<HTMLDivElement>(
      'character-card-list'
    );
    const errorMessageElement =
      screen.getByRole<HTMLDivElement>('error-message');

    expect(characterCardListElement).toBeNull();
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should render correctly with data', () => {
    renderWithProviders(
      <SearchNavigationProvider>
        <CharacterCardList {...props} />
      </SearchNavigationProvider>
    );

    const characterCardListElement = screen.queryByRole<HTMLDivElement>(
      'character-card-list'
    );
    const errorMessageElement =
      screen.queryByRole<HTMLDivElement>('error-message');

    expect(characterCardListElement).toBeInTheDocument();
    expect(errorMessageElement).toBeNull();
  });
});
