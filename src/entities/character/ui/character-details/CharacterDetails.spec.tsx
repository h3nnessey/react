import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';
import {
  CharacterDetails,
  type CharacterDetailsProps,
} from './CharacterDetails';

const mockUseRouter = vi.hoisted(() => vi.fn());
const mockUseSearchParams = vi.hoisted(() => vi.fn());
const mockUseSearchNavigation = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: mockUseRouter,
    useSearchParams: mockUseSearchParams,
  };
});

vi.mock('@/providers/search-navigation-provider', async () => {
  const mod = await import('@/providers/search-navigation-provider');
  return {
    ...mod,
    useSearchNavigation: mockUseSearchNavigation,
  };
});

describe('CharacterDetails component', () => {
  const props: CharacterDetailsProps = {
    data: characterMock,
    error: null,
  };

  let mockPush: Mock;

  beforeEach(() => {
    mockPush = vi.fn();
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseSearchNavigation.mockReturnValue({
      search: 'rick',
      navigate: vi.fn(),
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderCharacterDetails = (
    characterDetailsProps: CharacterDetailsProps = props
  ) => {
    renderWithProviders(
      <SearchNavigationProvider>
        <CharacterDetails {...characterDetailsProps} />
      </SearchNavigationProvider>
    );

    const tableElement = screen.queryByRole<HTMLTableElement>('details-table');
    const errorElement = screen.queryByRole<HTMLDivElement>('error-message');
    const buttonElement = screen.getByTestId<HTMLButtonElement>('close-button');
    const containerElement = screen.getByTestId<HTMLDivElement>('container');

    return { tableElement, errorElement, buttonElement, containerElement };
  };

  const testCases: {
    name: string;
    props: CharacterDetailsProps;
    assertions: (args: ReturnType<typeof renderCharacterDetails>) => void;
  }[] = [
    {
      name: 'should render correctly with data',
      props: props,
      assertions: ({ tableElement, errorElement }) => {
        expect(tableElement).toBeInTheDocument();
        expect(errorElement).toBeNull();
      },
    },
    {
      name: 'should render correctly if there is an error',
      props: { data: null, error: 'Error message' },
      assertions: ({ tableElement, errorElement }) => {
        expect(tableElement).toBeNull();
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent('Error message');
      },
    },
    {
      name: 'should call navigate when close button is clicked',
      props: props,
      assertions: ({ buttonElement }) => {
        fireEvent.click(buttonElement);
        expect(mockPush).toHaveBeenCalled();
      },
    },
    {
      name: 'should call navigate when clicking outside the container',
      props: props,
      assertions: ({ containerElement }) => {
        fireEvent.click(containerElement);
        expect(mockPush).toHaveBeenCalled();
      },
    },
  ];

  testCases.forEach(({ name, props, assertions }) => {
    it(name, () => {
      const renderResult = renderCharacterDetails(props);

      assertions(renderResult);
    });
  });
});
