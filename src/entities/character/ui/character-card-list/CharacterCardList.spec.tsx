import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import {
  CharacterCardList,
  type CharacterCardListProps,
} from './CharacterCardList';
import { act } from 'react';
import { charactersSlice } from '../../model';

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    usePathname: vi.fn(() => '/1'),
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

  it('should show loader', () => {
    const { store } = renderWithProviders(<CharacterCardList {...props} />);

    act(() => {
      store.dispatch(charactersSlice.actions.setIsLoading(true));
    });

    const loaderElement = screen.getByRole<HTMLDivElement>('loader');

    expect(loaderElement).toBeInTheDocument();
  });
});
