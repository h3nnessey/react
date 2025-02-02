import { Component, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export class Button extends Component<ButtonsProps> {
  render() {
    const { text, ...props } = this.props;

    return (
      <button className={styles.btn} {...props}>
        <span>{text}</span>
      </button>
    );
  }
}
