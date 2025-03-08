import { CharacterDetails, getCharacterById } from '@/entities/character';

export default async function CharacterPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const fulfilledSearchParams = await searchParams;

  const result = await getCharacterById(id);

  return (
    <CharacterDetails
      className="character-details"
      searchParams={fulfilledSearchParams}
      {...result}
    />
  );
}
