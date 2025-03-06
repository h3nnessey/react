'use client';
import { useSearchNavigation } from '@/providers/search-navigation-provider';
import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  disabled?: boolean;
  limit?: number;
  className?: string;
}

export const Pagination = ({
  pages = 1,
  limit = 5,
  className,
}: PaginationProps) => {
  const { page: currentPage, isLoading, navigate } = useSearchNavigation();

  if (pages <= 1) {
    return null;
  }

  const handleClick = (newPage: number) => {
    navigate({ page: newPage });
  };

  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    <div className={classnames(styles.pagination, className)} role="pagination">
      {pagesToRender.map(({ content, page }, index) => (
        <Button
          key={index}
          disabled={isLoading}
          className={styles.btn}
          active={currentPage === page}
          onClick={() => handleClick(page)}
        >
          {content}
        </Button>
      ))}
    </div>
  );
};
