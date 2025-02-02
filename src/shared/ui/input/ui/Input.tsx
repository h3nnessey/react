import { Component, type InputHTMLAttributes, type RefObject } from 'react';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef: RefObject<HTMLInputElement>;
};

export class Input extends Component<InputProps> {
  render() {
    const { inputRef, ...props } = this.props;

    return <input className={styles.input} ref={inputRef} {...props} />;
  }
}
