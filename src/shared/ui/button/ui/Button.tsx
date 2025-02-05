import { Component } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Button.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export class Button extends Component<ButtonsProps> {
  render() {
    const { children, className, ...restProps } = this.props;

    return (
      <button className={classnames(styles.btn, className)} {...restProps}>
        <span>{children}</span>
      </button>
    );
  }
}
