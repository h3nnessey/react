import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  currentPage: number;
  disabled?: boolean;
  limit?: number;
  className?: string;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  pages = 1,
  currentPage = 1,
  disabled = false,
  limit = 5,
  className,
  onPageChange,
}: PaginationProps) => {
  if (pages <= 1) {
    return null;
  }

  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    <div className={classnames(styles.pagination, className)} role="pagination">
      {pagesToRender.map(({ content, page }, index) => (
        <Button
          key={index}
          disabled={disabled}
          className={styles.btn}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {content}
        </Button>
      ))}
    </div>
  );
};
