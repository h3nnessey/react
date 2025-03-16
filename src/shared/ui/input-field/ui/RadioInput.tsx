import type { BaseInputProps } from './BaseInput';
import { classnames } from '@/shared/lib/styling';
import styles from '../InputField.module.scss';

interface RadioInputProps extends Omit<BaseInputProps, 'type'> {
  options: string[];
}

export const RadioInput = ({
  id,
  label,
  error,
  options,
  ...props
}: RadioInputProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      <div className={styles.radioGroup}>
        {options.map(option => (
          <div className={styles.radioOption} key={option}>
            <input
              id={`${id}-${option}`}
              type="radio"
              value={option}
              {...props}
            />
            <label htmlFor={`${id}-${option}`}>{option}</label>
          </div>
        ))}
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
