import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('should render correctly', () => {
    const text = 'Click me';

    render(<Button>{text}</Button>);

    const button = screen.getByRole<HTMLButtonElement>('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });
});
