import { Component, type ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  children?: ReactNode;
}

export class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    const { children, message } = this.props;

    return (
      <div className={styles.error}>
        <h2 className={styles.title}>{message}</h2>
        {children}
      </div>
    );
  }
}
