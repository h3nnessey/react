import { Button } from '@/shared/ui';
import { classnames } from '@/shared/lib/styling';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  pages,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  return (
    Boolean(pages) && (
      <div className={classnames(styles.pagination, className)}>
        {Array.from({ length: pages }, (_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              className={classnames({ [styles.active]: isActive })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
    )
  );
};
