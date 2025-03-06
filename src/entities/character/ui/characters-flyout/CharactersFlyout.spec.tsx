import { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { charactersSlice } from '../../model';
import { CharactersFlyout } from './CharactersFlyout';

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(() => new URLSearchParams()),
  };
});

global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('CharactersFlyout component', () => {
  it('should render correctly with no favorites', () => {
    renderWithProviders(<CharactersFlyout />);

    const flyoutElement =
      screen.queryByRole<HTMLDivElement>('characters-flyout');

    expect(flyoutElement).toBeNull();
  });

  it('should render correctly when there are favorites', () => {
    const { store } = renderWithProviders(<CharactersFlyout />);

    act(() => {
      store.dispatch(charactersSlice.actions.addToFavorites(characterMock));
    });

    const buttonElement =
      screen.getByTestId<HTMLButtonElement>('unselect-button');
    const flyoutElement = screen.getByRole<HTMLDivElement>('characters-flyout');

    expect(flyoutElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(flyoutElement).not.toBeInTheDocument();
  });
});
