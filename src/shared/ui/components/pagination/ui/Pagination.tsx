'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { charactersSlice } from '@/entities/character';
import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { getPagesToRender } from '../lib/getPagesToRender';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  pages: number;
  disabled?: boolean;
  limit?: number;
  currentPage?: number;
  className?: string;
}

export const Pagination = ({
  pages = 1,
  limit = 5,
  currentPage = 1,
  className,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(charactersSlice.selectors.isLoading);

  if (pages <= 1) {
    return null;
  }

  const handleClick = () => {
    dispatch(charactersSlice.actions.setIsLoading(true));
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
          onClick={() => handleClick()}
        >
          <Link
            className="link"
            href={{
              pathname: '/',
              query: {
                ...Object.fromEntries(searchParams.entries()),
                page,
              },
            }}
          >
            {content}
          </Link>
        </Button>
      ))}
    </div>
  );
};
