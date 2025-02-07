import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};
