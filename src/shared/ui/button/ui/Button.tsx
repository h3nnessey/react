import { Component } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export class Button extends Component<ButtonsProps> {
  render() {
    const { children, ...restProps } = this.props;

    return (
      <button className={styles.btn} {...restProps}>
        <span>{children}</span>
      </button>
    );
  }
}
