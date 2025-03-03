import Link from 'next/link';
import { ErrorMessage } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { Theme } from '@/shared/ui/theme';
import styles from '@/styles/not-found-page/NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={classnames(styles.container, Theme.Dark)}>
      <ErrorMessage message="404 | Not Found">
        <div className={styles.error}>
          <p>The page you are looking for does not exist</p>
          <Link className={styles.link} href="/" replace>
            Go Home
          </Link>
        </div>
      </ErrorMessage>
    </div>
  );
}
