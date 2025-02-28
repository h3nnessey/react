import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  it('should render correctly', () => {
    const ref = null;

    render(<Input inputRef={ref} />);

    const inputElement = screen.getByRole<HTMLInputElement>('input');

    expect(inputElement).toBeInTheDocument();
  });
});
