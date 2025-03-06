import { CharacterDetails, getCharacterById } from '@/entities/character';

export default async function CharacterPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const result = await getCharacterById(id);

  return <CharacterDetails className="character-details" {...result} />;
}
