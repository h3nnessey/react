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
        {characters && (
          <>
            <Pagination
              pages={characters.data?.info.pages || 0}
              currentPage={Number(params.page) || 1}
              disabled={isFetching}
              onPageChange={handlePageChange}
            />
            <CharacterCardList className={styles.list} {...characters} />
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
