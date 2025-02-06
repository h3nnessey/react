import { Button } from '@/shared/ui';
import { classnames } from '@/shared/lib/styling';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  className?: string;
}

export const Pagination = ({ pages, className }: PaginationProps) => {
  return (
    <div className={classnames(styles.pagination, className)}>
      {Array.from({ length: pages }, (_, index) => index + 1).map(page => (
        <Button key={page}>{page}</Button>
      ))}
    </div>
  );
};
