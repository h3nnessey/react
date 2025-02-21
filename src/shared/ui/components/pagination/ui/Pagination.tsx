import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  limit?: number;
  className?: string;
}

export const Pagination = ({
  pages,
  currentPage,
  disabled = false,
  limit = 5,
  onPageChange,
  className,
}: PaginationProps) => {
  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    !!pages && (
      <div className={classnames(styles.pagination, className)}>
        {pagesToRender.map(({ content, to }, index) => (
          <Button
            key={index}
            disabled={disabled}
            className={styles.btn}
            active={currentPage === to}
            onClick={() => onPageChange(to)}
          >
            {content}
          </Button>
        ))}
      </div>
    )
  );
};
