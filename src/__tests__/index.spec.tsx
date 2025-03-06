import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { processSearchParams } from '@/shared/lib/url';
import { characterMock, renderWithProviders } from '@/__mocks__';
import MainPage, { getServerSideProps } from '@/pagess';

const mockUseRouter = vi.hoisted(() => vi.fn());
const mockUseRouterRouteChange = vi.hoisted(() => vi.fn());
const mockGetCharacters = vi.hoisted(() => vi.fn());

vi.mock(import('next/router'), async importOriginal => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: mockUseRouter,
  };
});

vi.mock('@/shared/lib/router', () => {
  return {
    useRouterRouteChange: mockUseRouterRouteChange,
  };
});

vi.mock('@/entities/character', async importOriginal => {
  const mod = await importOriginal<typeof import('@/entities/character')>();
  return {
    ...mod,
    getCharacters: mockGetCharacters,
  };
});

global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('CharacterCardList component', () => {
  const mockRouter = {
    query: {},
    push: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
  };

  const props = {
    params: {
      id: characterMock.id.toString(),
      name: null,
      page: '1',
    },
    character: {
      data: characterMock,
      error: null,
    },
    characters: {
      data: {
        results: Array.from({ length: 10 }, () => characterMock),
        info: { count: 100, pages: 10, next: null, prev: null },
      },
      error: null,
    },
  };

  const renderMainPage = (
    mainPageProps: InferGetServerSidePropsType<
      typeof getServerSideProps
    > = props
  ) => {
    return renderWithProviders(<MainPage {...mainPageProps} />);
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      ...mockRouter,
    });

    mockUseRouterRouteChange.mockReturnValue({
      isFetching: false,
      router: { ...mockRouter },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly render pagination', () => {
    renderMainPage({
      ...props,
      params: { ...props.params, page: null },
      characters: {
        ...props.characters,
        data: {
          ...props.characters.data,
          info: { ...props.characters.data.info, pages: 0 },
        },
      },
    });

    const paginationElement = screen.queryByRole<HTMLDivElement>('pagination');

    expect(paginationElement).toBeNull();
  });

  it('should render correctly with passed data', () => {
    mockUseRouterRouteChange.mockReturnValue({
      isFetching: true,
    });

    renderMainPage();

    const loaderElement = screen.getByRole<HTMLDivElement>('loader');
    const paginationElement = screen.getByRole<HTMLDivElement>('pagination');
    const characterCardListElement = screen.getByRole<HTMLDivElement>(
      'character-card-list'
    );
    const characterDetailsTableElement =
      screen.getByRole<HTMLTableElement>('details-table');

    expect(characterDetailsTableElement).toBeInTheDocument();
    expect(characterCardListElement).toBeInTheDocument();
    expect(paginationElement).toBeInTheDocument();
    expect(loaderElement).toBeInTheDocument();
  });

  it('should correctly call router.push', () => {
    const mockPush = vi.fn();

    mockUseRouterRouteChange.mockReturnValue({
      isFetching: false,
      router: {
        ...mockRouter,
        push: mockPush,
      },
    });

    renderMainPage();

    const paginationElement = screen.getByRole<HTMLDivElement>('pagination');

    const secondPageButton = screen.getByRole<HTMLButtonElement>('button', {
      name: '2',
    });

    expect(paginationElement).toBeInTheDocument();
    expect(secondPageButton).toBeInTheDocument();
    expect(secondPageButton).toHaveTextContent('2');

    fireEvent.click(secondPageButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      search: processSearchParams({ page: '2' }),
    });
  });
});

describe('getServerSideProps', () => {
  const mockProps = {
    params: { id: null, name: null, page: null },
    character: { data: null, error: null },
    characters: {
      data: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
      error: null,
    },
  };

  const mockGetCharactersResult = {
    character: { data: null, error: null },
    characters: {
      data: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
      error: null,
    },
  };

  const mockContext = (query: Record<string, string | string[]>) => {
    return { query } as GetServerSidePropsContext;
  };

  it('should return props with default values when no query is provided', async () => {
    mockGetCharacters.mockResolvedValue(mockGetCharactersResult);

    const context = mockContext({});
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: mockProps,
    });
  });

  it('should return props with query values when provided', async () => {
    const query = { id: '1', name: 'Rick', page: '2' };

    mockGetCharacters.mockReturnValue(mockGetCharactersResult);

    const context = mockContext(query);
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        ...mockProps,
        params: query,
      },
    });
  });
});
