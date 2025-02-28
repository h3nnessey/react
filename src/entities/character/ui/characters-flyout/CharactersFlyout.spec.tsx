import { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { charactersSlice } from '../../model';
import { CharactersFlyout } from './CharactersFlyout';

global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('CharactersFlyout component', () => {
  it('should render correctly with no favorites', () => {
    renderWithProviders(<CharactersFlyout />);

    expect(screen.queryByRole('characters-flyout')).toBeNull();
  });

  it('should render correctly when there are favorites', () => {
    const { store } = renderWithProviders(<CharactersFlyout />);

    act(() => {
      store.dispatch(charactersSlice.actions.addToFavorites(characterMock));
    });

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(screen.queryByRole('characters-flyout')).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(screen.queryByRole('characters-flyout')).toBeNull();
  });
});
