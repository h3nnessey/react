import { screen, fireEvent } from '@testing-library/react';
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
import { MemoryRouter, Route, Routes } from 'react-router';
import { http, HttpResponse } from 'msw';
import { server, renderWithProviders } from '@/__tests__';
import { SearchResults } from './SearchResults';

vi.mock('@/shared/ui/components', () => ({
  Pagination: vi.fn(({ currentPage, onPageChange }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  )),
  ErrorMessage: vi.fn(({ message }) => (
    <div data-testid="error-message">{message}</div>
  )),
}));

vi.mock('@/entities/character', () => ({
  CharacterCardList: vi.fn(() => <div data-testid="character-card-list" />),
}));

const mockUseSearchParams = vi.hoisted(() => vi.fn());
const mockUseNavigate = vi.hoisted(() => vi.fn());
const mockUseParams = vi.hoisted(() => vi.fn());

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: mockUseSearchParams,
    useNavigate: mockUseNavigate,
    useParams: mockUseParams,
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchResults', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseNavigate.mockReturnValue(vi.fn());
  });

  it('renders Pagination and CharacterCardList when data is loaded', async () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('name=rick&page=1'),
    ]);

    renderWithProviders(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <Routes>
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    expect(
      await screen.findByTestId('character-card-list')
    ).toBeInTheDocument();
  });

  it('updates page when Next Page is clicked', async () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('name=rick&page=1'),
    ]);
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <Routes>
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    const nextPageButton = await screen.findByText('Next Page');
    fireEvent.click(nextPageButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'name=rick&page=2',
    });
  });

  it('shows error message when API fails', async () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('name=rick&page=1'),
    ]);

    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json(
          { error: 'Failed to fetch characters' },
          { status: 500 }
        );
      })
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <Routes>
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Failed to fetch characters');
  });

  it('closes card when clicking outside', async () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('name=rick&page=1'),
    ]);
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <Routes>
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    const container = await screen.findByTestId('search-results-container');
    fireEvent.click(container);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '?name=rick&page=1',
    });
  });
});
