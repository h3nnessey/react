import type { MouseEvent } from 'react';
import {
  useNavigate,
  useSearchParams,
  Outlet,
  useLocation,
  useParams,
} from 'react-router';
import { QueryParams } from '@/shared/api/characters';
import { CharacterCardList, useCharacters } from '@/entities/character';
import { Pagination } from '@/shared/ui/components';
import styles from './SearchResults.module.scss';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const query = searchParams.get(QueryParams.Name) || '';
  const page = Number(searchParams.get(QueryParams.Page)) || 1;

  const { data, error, isLoading } = useCharacters(query, page);

  const handleCardClose = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (id) {
      if (
        target === event.currentTarget ||
        target.classList.contains(styles.list)
      ) {
        navigate({
          pathname: '/',
          search: location.search,
        });
      }
    }
  };

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(QueryParams.Page, page.toString());

    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <Pagination
        pages={data?.info.pages || 0}
        currentPage={page}
        disabled={isLoading}
        onPageChange={handlePageChange}
        className={styles.pagination}
      />
      <div className={styles.container} onClick={handleCardClose}>
        <CharacterCardList
          characters={data?.results || []}
          isLoading={isLoading}
          error={error}
          className={styles.list}
        />
        <Outlet />
      </div>
    </>
  );
};
