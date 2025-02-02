import { Component, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export class Button extends Component<ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    return <button className={styles.btn} {...this.props} />;
  }
}
