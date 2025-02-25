import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { Pagination } from '@/features';
import {
  CharacterCardList,
  CharacterDetails,
  getCharacters,
  type GetCharactersReturnType,
  type GetCharactersParams,
} from '../entities/character';
import { Layout } from './layout';
import styles from '@/styles/Main.module.scss';

export default function Home({
  character,
  characters,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <main className={styles.main}>
        {characters.data && (
          <>
            <Pagination
              pages={characters.data.info.pages}
              currentPage={Number(params.page) || 1}
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
