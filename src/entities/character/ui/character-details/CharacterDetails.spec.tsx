import { MemoryRouter, Route, Routes } from 'react-router';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterAll,
  beforeAll,
  afterEach,
} from 'vitest';
import { http, HttpResponse } from 'msw';
import { screen, fireEvent } from '@testing-library/react';
import { server, renderWithProviders, mockCharacter } from '@/__tests__';
import { CharacterDetails } from '@/entities/character/ui/character-details/CharacterDetails';

vi.mock('@/shared/ui/components', () => ({
  Loader: vi.fn(() => <div data-testid="loader">Loader</div>),
  ErrorMessage: vi.fn(({ message }) => (
    <div data-testid="error-message">{message}</div>
  )),
  Button: vi.fn(({ onClick, children }) => (
    <button onClick={onClick} data-testid="close-button">
      {children}
    </button>
  )),
}));

const url = 'https://rickandmortyapi.com/api/character/1';

const mockUseNavigate = vi.hoisted(() => vi.fn());
const mockUseParams = vi.hoisted(() => vi.fn());

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: mockUseNavigate,
    useParams: mockUseParams,
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseNavigate.mockReturnValue(vi.fn());
  });

  it('renders character details when data is loaded', async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json(mockCharacter);
      })
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const { name, status, species, gender, origin, location, episode, image } =
      mockCharacter;

    expect(await screen.findByRole('img')).toHaveAttribute('src', image);
    expect(await screen.findByRole('name')).toHaveTextContent(name);
    expect(await screen.findByRole('status')).toHaveTextContent(status);
    expect(await screen.findByRole('species')).toHaveTextContent(species);
    expect(await screen.findByRole('gender')).toHaveTextContent(gender);
    expect(await screen.findByRole('origin')).toHaveTextContent(origin.name);
    expect(await screen.findByRole('location')).toHaveTextContent(
      location.name
    );
    expect(await screen.findByRole('episodes')).toHaveTextContent(
      episode.length.toString()
    );
  });

  it('shows a loader while loading', async () => {
    server.use(
      http.get(url, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return HttpResponse.json(mockCharacter);
      })
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('loader')).toBeInTheDocument();
  });

  it('navigates back to home page when close button is clicked', async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json(mockCharacter);
      })
    );

    const mockNavigate = vi.fn();

    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await screen.findByTestId('close-button');

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/', search: '' });
  });
});
