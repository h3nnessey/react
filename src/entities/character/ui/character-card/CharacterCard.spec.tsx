import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { CharacterCard } from './CharacterCard';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

describe('CharacterCard component', () => {
  const renderCharacterCard = () => {
    renderWithProviders(<CharacterCard {...characterMock} />);

    const cardElement = screen.getByRole<HTMLDivElement>('character-card');
    const checkboxElement =
      screen.getByRole<HTMLInputElement>('add-to-favorites');

    return {
      cardElement,
      checkboxElement,
    };
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {},
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with passed data', () => {
    const { cardElement, checkboxElement } = renderCharacterCard();

    expect(cardElement).toBeInTheDocument();
    expect(checkboxElement).toBeInTheDocument();
  });

  it('should dispatch actions correctly', () => {
    const { checkboxElement } = renderCharacterCard();

    expect(checkboxElement.checked).toBe(false);
    fireEvent.click(checkboxElement);
    expect(checkboxElement.checked).toBe(true);
    fireEvent.click(checkboxElement);
    expect(checkboxElement.checked).toBe(false);
  });
});
