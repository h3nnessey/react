import { classnames } from '@/shared/lib/styling';
import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classnames(styles.container, className)} role="loader">
      <span className={styles.loader}></span>
    </div>
  );
};
