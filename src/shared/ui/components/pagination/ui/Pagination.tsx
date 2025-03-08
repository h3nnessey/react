import { Link } from 'react-router';
import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { processSearchParams } from '@/shared/lib/url';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  disabled?: boolean;
  limit?: number;
  className?: string;
  linkTo: {
    pathname: string;
    search: string;
  };
}

export const Pagination = ({
  pages = 1,
  disabled = false,
  limit = 5,
  className,
  linkTo: { pathname, search },
}: PaginationProps) => {
  if (pages <= 1) return null;

  const searchParams = new URLSearchParams(search);
  const currentPage = Number(searchParams.get('page')) || 1;
  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    <div className={classnames(styles.pagination, className, 'pagination')}>
      {pagesToRender.map(({ content, to }, index) => (
        <Button
          key={index}
          disabled={disabled}
          className={styles.btn}
          active={currentPage === to}
        >
          <Link
            className="link"
            to={{
              pathname,
              search: processSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: to,
              }),
            }}
          >
            {content}
          </Link>
        </Button>
      ))}
    </div>
  );
};
