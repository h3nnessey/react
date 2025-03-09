import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { Loader, Pagination } from '@/shared/ui/components';
import { useRouterRouteChange } from '@/shared/lib/router';
import { processSearchParams } from '@/shared/lib/url';
import {
  CharacterCardList,
  CharacterDetails,
  getCharacters,
  type GetCharactersReturnType,
  type GetCharactersParams,
} from '@/entities/character';
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
      search: processSearchParams({ ...params, page, id: null }),
    });
  };

  return (
    <main className={styles.main}>
      <Pagination
        pages={characters.data?.info.pages || 1}
        currentPage={Number(params.page) || 1}
        disabled={isFetching}
        onPageChange={handlePageChange}
      />
      <div className={styles.container}>
        {isFetching && <Loader />}
        <CharacterCardList {...characters} />
        {character && <CharacterDetails {...character} />}
      </div>
    </main>
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
