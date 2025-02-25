import { useRouter } from 'next/router';
import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { processSearchParams } from '@/shared/lib/url';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  currentPage: number;
  disabled?: boolean;
  limit?: number;
  className?: string;
}

export const Pagination = ({
  pages,
  currentPage,
  disabled = false,
  limit = 5,
  className,
}: PaginationProps) => {
  const router = useRouter();
  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  const handleClick = (to: number) => {
    if (to !== currentPage) {
      router.push({
        pathname: '/',
        query: processSearchParams({ ...router.query, page: to }),
      });
    }
  };

  return (
    !!pages && (
      <div className={classnames(styles.pagination, className)}>
        {pagesToRender.map(({ content, to }, index) => (
          <Button
            key={index}
            disabled={disabled}
            className={styles.btn}
            active={currentPage === to}
            onClick={() => handleClick(to)}
          >
            {content}
          </Button>
        ))}
      </div>
    )
  );
};
