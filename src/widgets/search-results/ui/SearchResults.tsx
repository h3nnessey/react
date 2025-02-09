import { useNavigate, useSearchParams, Outlet } from 'react-router';
import { useCharacters, QueryParams } from '@/shared/api/characters';
import { CharacterCardList } from '@/entities/character';
import { Pagination } from '@/features/pagination';
import styles from './SearchResults.module.scss';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get(QueryParams.Name) || '';
  const page = Number(searchParams.get(QueryParams.Page)) || 1;

  const { data, error, isLoading } = useCharacters(query, page);

  const handlePaginationChange = (page: number) => {
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
        onPageChange={handlePaginationChange}
        disabled={isLoading}
        className={styles.pagination}
      />
      <div className={styles.container}>
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
