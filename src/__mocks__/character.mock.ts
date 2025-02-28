import {
  Character,
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from '@/entities/character';

export const characterMock: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: CharacterStatus.Alive,
  species: CharacterSpecies.Human,
  type: '',
  gender: CharacterGender.Male,
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};
