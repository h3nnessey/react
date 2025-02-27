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
  pages,
  currentPage,
  disabled = false,
  limit = 5,
  className,
  onPageChange,
}: PaginationProps) => {
  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    pages > 1 && (
      <div className={classnames(styles.pagination, className)}>
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
    )
  );
};
