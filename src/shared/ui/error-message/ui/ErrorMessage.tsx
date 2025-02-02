import { PureComponent, type ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  children?: ReactNode;
}

export class ErrorMessage extends PureComponent<ErrorMessageProps> {
  render() {
    return (
      <div className={styles.error}>
        <h2 className={styles.title}>{this.props.message}</h2>
        {this.props.children}
      </div>
    );
  }
}
