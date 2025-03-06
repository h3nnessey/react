import { Loader } from '@/shared/ui/components';
import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
}
