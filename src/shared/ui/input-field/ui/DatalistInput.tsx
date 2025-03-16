import { classnames } from '@/shared/lib/styling';
import type { BaseInputProps } from './BaseInput';
import styles from '../InputField.module.scss';

interface DatalistInputProps extends Omit<BaseInputProps, 'type'> {
  options: string[];
}

export const DatalistInput = ({
  id,
  label,
  error,
  options,
  ...props
}: DatalistInputProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      <input id={id} list={`${id}-list`} className={styles.input} {...props} />
      <datalist id={`${id}-list`}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
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
