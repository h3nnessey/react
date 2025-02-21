import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Character,
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from '@/shared/api/characters';
import { CharacterDetails } from './CharacterDetails';

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

const mockUseCharacter = vi.hoisted(() => vi.fn());

vi.mock('@/entities/character', () => ({
  useCharacter: mockUseCharacter,
}));

describe('CharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCharacter.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
  });

  it('should display loader when loading', () => {
    mockUseCharacter.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={[`/${characterMock.id}`]}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const loaderElement = screen.getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should correctly display data', async () => {
    mockUseCharacter.mockReturnValue({
      data: characterMock,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={[`/${characterMock.id}`]}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('name')).toHaveTextContent(characterMock.name);
    expect(screen.getByRole('status')).toHaveTextContent(characterMock.status);
    expect(screen.getByRole('species')).toHaveTextContent(
      characterMock.species
    );
    expect(screen.getByRole('gender')).toHaveTextContent(characterMock.gender);
    expect(screen.getByRole('origin')).toHaveTextContent(
      characterMock.origin.name
    );
    expect(screen.getByRole('location')).toHaveTextContent(
      characterMock.location.name
    );
    expect(screen.getByRole('episodes')).toHaveTextContent(
      characterMock.episode.length.toString()
    );
  });

  it('should hide the component when the close button is clicked', async () => {
    mockUseCharacter.mockReturnValue({
      data: characterMock,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={[`/${characterMock.id}`]}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });
});
