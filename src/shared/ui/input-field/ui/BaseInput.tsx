import type { InputHTMLAttributes } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from '../InputField.module.scss';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
  label: string;
  error?: string;
}

export const BaseInput = ({ id, label, error, ...props }: BaseInputProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      <input id={id} className={styles.input} {...props} />
      <div
        className={classnames(styles.errorContainer, {
          [styles.visible]: !!error,
        })}
      >
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};
