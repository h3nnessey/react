import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch component', () => {
  it('should render correctly', () => {
    render(<Switch />);

    const switchElement = screen.getByRole<HTMLLabelElement>('switch');

    expect(switchElement).toBeInTheDocument();
  });
});
