import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useParams, useLocation } from 'react-router';
import { render, screen } from '@testing-library/react';
import {
  Character,
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from '@/shared/api/characters';
import { CharacterCardList, CharacterCardListProps } from './CharacterCardList';

const characterMock: Character = {
  id: 3,
  name: 'Morty Smith',
  status: CharacterStatus.Alive,
  species: CharacterSpecies.Human,
  type: '',
  gender: CharacterGender.Male,
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('CharacterCardList', () => {
  const mockLocation = {
    pathname: '/',
    search: '?page=1',
    state: '',
    key: '',
    hash: '',
  };
  const mockParams = { id: characterMock.id.toString() };

  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useParams).mockReturnValue(mockParams);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderCardList = (
    props: CharacterCardListProps = { characters: [], error: null }
  ) => {
    return render(<CharacterCardList {...props} />);
  };

  it('should render message if no characters found', () => {
    const message = 'There is nothing here';
    renderCardList({ characters: [], error: message });

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it('should render specified number of characters', () => {
    const characters = [characterMock, characterMock, characterMock];
    renderCardList({ characters, error: null });

    const imgElements = screen.getAllByRole('img');
    expect(imgElements).toHaveLength(characters.length);
  });
});
