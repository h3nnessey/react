import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { Loader, Pagination } from '@/shared/ui/components';
import { useRouterRouteChange } from '@/shared/lib/router';
import {
  CharacterCardList,
  CharacterDetails,
  getCharacters,
  type GetCharactersReturnType,
  type GetCharactersParams,
} from '../entities/character';
import Layout from './layout';
import styles from '@/styles/main-page/MainPage.module.scss';

export default function MainPage({
  character,
  characters,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isFetching, router } = useRouterRouteChange();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page,
      },
    });
  };

  return (
    <Layout>
      <main className={styles.main}>
        {isFetching && <Loader className={styles.loader} />}
        {/* add error type narrowing */}
        {characters.data && (
          <>
            <Pagination
              pages={characters.data.info.pages}
              currentPage={Number(params.page) || 1}
              onPageChange={handlePageChange}
              disabled={isFetching}
            />
            <CharacterCardList
              className={styles.list}
              characters={characters.data.results}
            />
          </>
        )}
        {character && <CharacterDetails {...character} />}
      </main>
    </Layout>
  );
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const { id = null, name = null, page = null } = context.query;
  const params = { id, name, page };

  return {
    props: {
      ...(await getCharacters(params)),
      params,
    },
  };
}) satisfies GetServerSideProps<
  {
    params: GetCharactersParams;
  } & GetCharactersReturnType
>;
