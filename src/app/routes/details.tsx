import { Suspense } from 'react';
import { Await, useNavigation } from 'react-router';
import { CharacterDetails, getCharacterById } from '@/entities/character';
import { Loader } from '@/shared/ui/components';
import type { Route } from './+types/details';

export async function loader({ params, request }: Route.LoaderArgs) {
  const search = new URL(request.url).searchParams.toString();

  return { characterPromise: getCharacterById(params.id), search };
}

export default function Details({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const { characterPromise, search } = loaderData;
  const linkTo = {
    pathname: '/',
    search,
  };
  const isLoading =
    navigation.state === 'loading' && navigation.location?.pathname !== '/';

  return (
    <Suspense
      fallback={
        <div style={{ position: 'relative', minWidth: '380px' }}>
          <Loader />
        </div>
      }
    >
      <Await resolve={characterPromise}>
        {character => (
          <CharacterDetails
            character={character}
            isLoading={isLoading}
            linkTo={linkTo}
          />
        )}
      </Await>
    </Suspense>
  );
}
