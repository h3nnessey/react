import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Button.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonsProps) => {
  return (
    <button className={classnames(styles.btn, className)} {...props}>
      <span>{children}</span>
    </button>
  );
};
