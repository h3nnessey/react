import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { useRouter } from 'next/router';
import {
  CharacterCardList,
  CharacterDetails,
  CharactersFlyout,
  getCharacters,
} from '../entities/character';
import type {
  GetCharactersOkResponse,
  RequestResult,
  Character,
} from '../entities/character';
import { Header } from '@/widgets';
import { ErrorMessage, Pagination } from '@/shared/ui/components';
import { processSearchParams } from '@/shared/lib/url';
import styles from '@/styles/Main.module.scss';

export default function Home({
  character,
  characters,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleClick = (page: number) => {
    router.push({
      pathname: '/',
      query: processSearchParams({ ...params, page }),
    });
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {characters.success && (
          <Pagination
            className={styles.pagination}
            pages={characters.data.info.pages}
            currentPage={Number(params.page) || 1}
            onPageChange={handleClick}
          />
        )}
        <div className={styles.container}>
          {characters.success ? (
            <CharacterCardList
              characters={characters.data.results}
              className={styles.list}
            />
          ) : (
            <ErrorMessage message={characters.error} />
          )}
          {character && character.success && (
            <CharacterDetails
              character={character.data}
              className={styles.details}
            />
          )}
        </div>

        <CharactersFlyout />
      </main>
    </>
  );
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const { id, name, page } = context.query;

  return {
    props: {
      ...(await getCharacters({ id, name, page })),
      params: {
        id: id || null,
        name: name || null,
        page: page || null,
      },
    },
  };
}) satisfies GetServerSideProps<{
  params: {
    id: string | string[] | null;
    name: string | string[] | null;
    page: string | string[] | null;
  };
  characters: RequestResult<GetCharactersOkResponse>;
  character: RequestResult<Character> | null;
}>;
