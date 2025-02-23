import { http, HttpResponse } from 'msw';

const characterMock = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
};

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const page = url.searchParams.get('page');

    if (name === 'rick' && page === '1') {
      return HttpResponse.json({
        results: [characterMock],
        info: { pages: 10, count: 100, next: null, prev: null },
      });
    }

    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }),
];
