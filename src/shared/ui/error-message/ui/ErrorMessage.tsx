import type { ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  children?: ReactNode;
  className?: string;
}

export const ErrorMessage = ({
  message,
  className,
  children,
}: ErrorMessageProps) => {
  return (
    <div className={classnames(styles.error, className)} role="error">
      <h2 className={styles.title}>{message}</h2>
      {children}
    </div>
  );
};
