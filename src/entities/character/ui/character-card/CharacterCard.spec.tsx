import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useParams, useNavigate, useLocation } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Character,
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from '@/shared/api/characters';
import { CharacterCard } from './CharacterCard';

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

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('CharacterCard', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    pathname: '/',
    search: '?page=1',
    state: '',
    key: '',
    hash: '',
  };

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue(mockLocation);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderCard = () => {
    return render(<CharacterCard {...characterMock} />);
  };

  it('should render character card with provided data', () => {
    vi.mocked(useParams).mockReturnValue({ id: characterMock.id.toString() });

    renderCard();
    const titleElement = screen.getByTitle(characterMock.name);
    const statusElement = screen.getByText(capitalize(characterMock.status));
    const imageElement = screen.getByRole('img');
    expect(titleElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', characterMock.image);
  });

  it('should navigate to the character details page on click', () => {
    vi.mocked(useParams).mockReturnValue({ id: '2' });

    renderCard();

    const card = screen.getByTitle(characterMock.name);
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/${characterMock.id}${mockLocation.search}`
    );
  });
});
