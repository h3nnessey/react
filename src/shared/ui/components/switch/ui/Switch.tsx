import type { InputHTMLAttributes } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Switch.module.scss';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Switch = ({
  className,
  checked,
  title,
  ...props
}: SwitchProps) => {
  return (
    <label
      className={classnames(styles.label, className)}
      title={title}
      role="switch"
    >
      <input
        type="checkbox"
        checked={checked}
        className={styles.input}
        {...props}
      />
    </label>
  );
};
