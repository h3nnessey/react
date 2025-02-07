import { useParams } from 'react-router';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>Character id: {id}</h1>;
};
