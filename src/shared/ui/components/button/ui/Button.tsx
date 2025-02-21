import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
}: ButtonsProps) => {
  return (
    <button
      className={classnames(
        styles.btn,
        styles[variant],
        { [styles.active]: active },
        className
      )}
      role="button"
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};
