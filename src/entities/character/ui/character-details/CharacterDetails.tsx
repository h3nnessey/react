import { useParams } from 'react-router';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();

  return <div>ID {id}</div>;
};
