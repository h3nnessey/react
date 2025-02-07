import { useSearchParams } from 'react-router';
import {
  useCharacters,
  QueryParams,
  type Character,
} from '@/shared/api/characters';
import { CardList, Loader, ErrorMessage } from '@/shared/ui/';
import { Pagination } from '@/features/pagination';
import styles from './SearchResults.module.scss';

const characterMapper = ({ id, image, name, status }: Character) => {
  return {
    id,
    imageUrl: image,
    title: name,
    description: status,
    className: status.toLowerCase(),
  };
};

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
        {error && <ErrorMessage message={error} />}
        {data && <CardList items={data.results.map(characterMapper)} />}
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
