import type { MouseEvent } from 'react';
import {
  useNavigate,
  useSearchParams,
  Outlet,
  useLocation,
  useParams,
} from 'react-router';
import { ErrorMessage, Pagination } from '@/shared/ui/components';
import {
  CharacterCardList,
  useGetCharactersQuery,
  deserializeError,
} from '@/entities/character';
import styles from './SearchResults.module.scss';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const name = searchParams.get('name') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, error } = useGetCharactersQuery({
    page,
    name,
  });

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

    searchParams.set('page', page.toString());

    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  if (error) {
    return <ErrorMessage message={deserializeError(error)} />;
  }

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
          className={styles.list}
        />
        <Outlet />
      </div>
    </>
  );
};
