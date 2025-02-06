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
  };
};

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { data, error, isLoading } = useCharacters(
    searchParams.get(QueryParams.Name) || ''
  );

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && <CardList items={data.results.map(characterMapper)} />}
      {!isLoading && data && (
        <Pagination className={styles.pagination} pages={data.info.pages} />
      )}
    </>
  );
};
