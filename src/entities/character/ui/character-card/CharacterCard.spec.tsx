import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { CharacterCard } from './CharacterCard';

const mockUseSearchParams = vi.hoisted(() => vi.fn());
const mockUsePathname = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    usePathname: mockUsePathname,
    useSearchParams: mockUseSearchParams,
  };
});

describe('CharacterCard component', () => {
  const id = '2';

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUsePathname.mockReturnValue(`/${id}`);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderCharacterCard = () => {
    renderWithProviders(<CharacterCard {...characterMock} />);

    const cardElement = screen.getByRole<HTMLDivElement>('character-card');
    const checkboxElement =
      screen.getByRole<HTMLInputElement>('add-to-favorites');
    const linkElement = screen.queryByRole<HTMLAnchorElement>('link');

    return {
      cardElement,
      linkElement,
      checkboxElement,
    };
  };

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

  it('should render Link component correctly', () => {
    const { linkElement } = renderCharacterCard();

    expect(linkElement).not.toBeNull();
  });
});
