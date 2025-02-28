import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from '../../model';
import {
  CharacterDetails,
  type CharacterDetailsProps,
} from './CharacterDetails';

const mockUseRouter = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

describe('CharacterDetails component', () => {
  const props: CharacterDetailsProps = {
    data: {
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
    },
    error: null,
  };

  const renderCharacterDetails = (
    characterDetailsProps: CharacterDetailsProps = props
  ) => {
    render(<CharacterDetails {...characterDetailsProps} />);
    const tableElement = screen.queryByRole<HTMLTableElement>('details-table');
    const errorElement = screen.queryByRole<HTMLDivElement>('error-message');
    const buttonElement = screen.getByRole<HTMLButtonElement>('button');

    return { tableElement, errorElement, buttonElement };
  };

  it('should render correctly with data', () => {
    const { errorElement, tableElement } = renderCharacterDetails();

    expect(tableElement).toBeInTheDocument();
    expect(errorElement).toBeNull();
  });

  it('should render correctly if there is an error', () => {
    const message = 'Error message';
    const { errorElement, tableElement } = renderCharacterDetails({
      data: null,
      error: message,
    });

    expect(tableElement).toBeNull();
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(message);
  });

  it('should correctly call router.push', () => {
    const mockPush = vi.fn();

    mockUseRouter.mockReturnValue({
      query: {
        name: props.data.name,
        id: props.data.id,
        page: '1',
      },
      push: mockPush,
    });

    const { buttonElement } = renderCharacterDetails();

    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      search: 'name=Rick+Sanchez&page=1',
    });
  });
});
