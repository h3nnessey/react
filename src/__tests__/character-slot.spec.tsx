import { expect, it, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterSlot } from '@/app/@character/[id]/CharacterSlot';

const mockUsePathname = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    usePathname: mockUsePathname,
  };
});

describe('CharacterSlot component', () => {
  it('should render correctly with id', () => {
    mockUsePathname.mockReturnValue('/1');

    render(<CharacterSlot character={<div data-testid="slot">slot</div>} />);

    const slotElement = screen.getByTestId<HTMLDivElement>('slot');

    expect(slotElement).toBeInTheDocument();
  });

  it('should return null without id', () => {
    mockUsePathname.mockReturnValue('/');

    render(<CharacterSlot character={<div data-testid="slot">slot</div>} />);

    const slotElement = screen.queryByTestId<HTMLDivElement>('slot');

    expect(slotElement).toBeNull();
  });
});
