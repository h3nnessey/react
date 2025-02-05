import { classnames } from '@/shared/lib/styling';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classnames(styles.container, className)}>
      <span className={styles.loader}></span>
    </div>
  );
};
