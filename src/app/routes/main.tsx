import { Outlet, useNavigation } from 'react-router';
import {
  CharacterCardList,
  CharactersFlyout,
  getFilteredCharacters,
} from '@/entities/character';
import { Pagination } from '@/shared/ui/components';
import { Header } from '@/widgets';
import type { Route } from './+types/main';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') || '1';
  const name = searchParams.get('name') || '';
  const result = await getFilteredCharacters(name, page);

  return {
    data: {
      characters: result?.results || [],
      pages: result?.info?.pages || 1,
      search: searchParams.toString(),
    },
  };
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const {
    data: { characters, pages, search },
  } = loaderData;
  const linkTo = {
    pathname: '/',
    search,
  };
  const isLoading =
    navigation.state === 'loading' &&
    navigation.location?.pathname === '/' &&
    !navigation.location?.state;

  return (
    <>
      <Header />
      <main>
        <Pagination pages={pages} disabled={isLoading} linkTo={linkTo} />
        <CharacterCardList characters={characters} isLoading={isLoading} />
        <Outlet />
      </main>
      <CharactersFlyout />
    </>
  );
}
