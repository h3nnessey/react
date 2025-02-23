import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Switch, type SwitchProps } from './Switch';
import styles from './Switch.module.scss';

describe('Switch Component', () => {
  const renderSwitch = (props: Partial<SwitchProps> = {}) => {
    return render(<Switch {...props} />);
  };

  it('should render with proper className', () => {
    const className = 'qwe';
    renderSwitch({ className });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveClass(className);
  });

  it('should render input checked', () => {
    renderSwitch({ checked: true });

    const labelElement = screen.getByRole('switch');
    const inputElement = labelElement.querySelector('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement?.checked).toBe(true);
  });

  it('should render switch with default className', () => {
    renderSwitch();

    const labelElement = screen.getByRole('switch');
    const inputElement = labelElement.querySelector('input');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass(styles.label);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(styles.input);
  });

  it('should render title', () => {
    const title = '123';
    renderSwitch({ title });

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('title', title);
  });
});
