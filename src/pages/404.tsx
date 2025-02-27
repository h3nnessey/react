import Link from 'next/link';
import { ErrorMessage } from '@/shared/ui/components';
import Layout from './layout';
import styles from '@/styles/not-found-page/NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <Layout>
      <div>
        <ErrorMessage message="404 | Not Found">
          <div className={styles.error}>
            <p>The page you are looking for does not exist</p>
            <p>
              Do a search or
              <Link className={styles.link} href="/" replace>
                Go Home
              </Link>
            </p>
          </div>
        </ErrorMessage>
      </div>
    </Layout>
  );
}
