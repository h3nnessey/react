import { useSearchParams } from 'react-router';
import { useCharacters, QueryParams } from '@/shared/api/characters';
import { CharacterCardList } from '@/entities/character';
import { Loader, ErrorMessage } from '@/shared/ui/';
import { Pagination } from '@/features/pagination';
import styles from './SearchResults.module.scss';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Name) || '';
  const page = Number(searchParams.get(QueryParams.Page)) || 1;

  const { data, error, isLoading } = useCharacters(query, page);

  const handlePaginationChange = (page: number) => {
    searchParams.set(QueryParams.Page, page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className={styles.container}>
        {isLoading && <Loader />}
        {data && <CharacterCardList characters={data.results} />}
        {error && <ErrorMessage message={error} />}
      </div>
      <Pagination
        pages={data?.info.pages}
        currentPage={page}
        onPageChange={handlePaginationChange}
        disabled={isLoading}
        className={styles.pagination}
      />
    </>
  );
};
