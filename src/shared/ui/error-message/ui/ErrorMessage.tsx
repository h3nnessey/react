import { Component, type ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  children?: ReactNode;
  className?: string;
}

export class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    const { children, message, className } = this.props;

    return (
      <div className={classnames(styles.error, className)}>
        <h2 className={styles.title}>{message}</h2>
        {children}
      </div>
    );
  }
}
