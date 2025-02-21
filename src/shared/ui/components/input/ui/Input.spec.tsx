import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input, InputProps } from './Input';

describe('Input Component', () => {
  const renderInput = (props: Partial<InputProps> = {}) => {
    return render(<Input inputRef={null} {...props} />);
  };

  it('should apply className', () => {
    const className = 'qwe';
    renderInput({ className });

    const inputElement = screen.getByRole('input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(className);
  });
});
