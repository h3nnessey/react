import { CharacterCardList, getFilteredCharacters } from '@/entities/character';
import { Pagination } from '@/shared/ui/components';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { name, page } = await searchParams;

  const result = await getFilteredCharacters({ name, page });

  return (
    <>
      <Pagination className="pagination" pages={result.data?.info.pages || 1} />
      <CharacterCardList className="character-list" {...result} />
    </>
  );
}
