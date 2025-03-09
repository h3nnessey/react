import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import {
  CharacterCardList,
  type CharacterCardListProps,
} from './CharacterCardList';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

describe('CharacterCardList component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {},
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

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

    renderWithProviders(<CharacterCardList data={null} error={message} />);

    const characterCardListElement = screen.queryByRole<HTMLDivElement>(
      'character-card-list'
    );
    const errorMessageElement =
      screen.getByRole<HTMLDivElement>('error-message');

    expect(characterCardListElement).toBeNull();
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should render correctly with data', () => {
    renderWithProviders(<CharacterCardList {...props} />);

    const characterCardListElement = screen.queryByRole<HTMLDivElement>(
      'character-card-list'
    );
    const errorMessageElement =
      screen.queryByRole<HTMLDivElement>('error-message');

    expect(characterCardListElement).toBeInTheDocument();
    expect(errorMessageElement).toBeNull();
  });
});
