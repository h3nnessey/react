import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, ButtonsProps, ButtonVariant } from './Button';
import styles from './Button.module.scss';

describe('Button Component', () => {
  const children = 'children text';

  const renderButton = (props: ButtonsProps = {}) => {
    return render(<Button {...props}>{children}</Button>);
  };

  it('should render children', () => {
    renderButton();

    const buttonElement = screen.getByRole('button', { name: children });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should apply primary variant by default', () => {
    renderButton();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(styles.primary);
  });

  it.each<ButtonVariant>(['primary', 'secondary', 'danger'])(
    'should correctly apply %s variant',
    variant => {
      renderButton({ variant });

      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toHaveClass(styles[variant]);
    }
  );
  it('should apply active class', () => {
    renderButton({ active: true });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(styles.active);
  });

  it('should apply className', () => {
    const className = 'qwe';
    renderButton({ className });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(className);
  });

  it('should be disabled', () => {
    renderButton({ disabled: true });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
