import { Component } from 'react';
import type { InputHTMLAttributes, RefObject } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef: RefObject<HTMLInputElement>;
  className?: string;
};

export class Input extends Component<InputProps> {
  render() {
    const { inputRef, className, ...restProps } = this.props;

    return (
      <input
        className={classnames(styles.input, className)}
        ref={inputRef}
        {...restProps}
      />
    );
  }
}
