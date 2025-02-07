import { Button } from '@/shared/ui';
import { classnames } from '@/shared/lib/styling';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number | undefined;
  currentPage: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  pages,
  currentPage,
  disabled,
  onPageChange,
  className,
}: PaginationProps) => {
  return (
    !!pages && (
      <div className={classnames(styles.pagination, className)}>
        {Array.from({ length: pages }, (_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              disabled={disabled}
              active={isActive}
              className={styles.btn}
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
