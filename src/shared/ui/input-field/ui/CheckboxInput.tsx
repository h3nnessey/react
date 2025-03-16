import type { BaseInputProps } from './BaseInput';
import { classnames } from '@/shared/lib/styling';
import styles from '../InputField.module.scss';

type CheckboxInputProps = Omit<BaseInputProps, 'type'>;

export const CheckboxInput = ({
  id,
  label,
  error,
  ...props
}: CheckboxInputProps) => {
  return (
    <div className={styles.field}>
      <div className={styles.checkboxContainer}>
        <label htmlFor={id} className={styles.checkboxLabel}>
          {label}
        </label>
        <input id={id} type="checkbox" className={styles.checkbox} {...props} />
      </div>
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
