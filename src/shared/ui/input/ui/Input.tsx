import type { InputHTMLAttributes, RefObject } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef: RefObject<HTMLInputElement>;
  className?: string;
};

export const Input = ({ inputRef, className, ...props }: InputProps) => {
  return (
    <input
      className={classnames(styles.input, className)}
      ref={inputRef}
      {...props}
    />
  );
};
