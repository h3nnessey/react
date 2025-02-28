import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Button = ({
  className,
  children,
  active = false,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classnames(
        styles.btn,
        styles[variant],
        { [styles.active]: active },
        className
      )}
      {...props}
      role="button"
    >
      <span>{children}</span>
    </button>
  );
};
