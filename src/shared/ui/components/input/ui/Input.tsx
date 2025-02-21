import type { InputHTMLAttributes, RefObject } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef: RefObject<HTMLInputElement> | null;
  className?: string;
};

export const Input = ({ inputRef, className, ...props }: InputProps) => {
  return (
    <input
      className={classnames(styles.input, className)}
      ref={inputRef}
      role="input"
      {...props}
    />
  );
};
