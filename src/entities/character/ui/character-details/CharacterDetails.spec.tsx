import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { processSearchParams } from '@/shared/lib/url';
import { characterMock } from '@/__mocks__';
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
    data: characterMock,
    error: null,
  };

  const mockRouterReturnValue = {
    query: {
      name: props.data.name,
      id: props.data.id,
      page: '1',
    },
    push: vi.fn(),
  };

  const mockPushArgs = {
    pathname: '/',
    search: processSearchParams({
      ...mockRouterReturnValue.query,
      id: undefined,
    }),
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouterReturnValue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderCharacterDetails = (
    characterDetailsProps: CharacterDetailsProps = props
  ) => {
    const { container } = render(
      <CharacterDetails {...characterDetailsProps} />
    );
    const tableElement = screen.queryByRole<HTMLTableElement>('details-table');
    const errorElement = screen.queryByRole<HTMLDivElement>('error-message');
    const buttonElement = screen.getByRole<HTMLButtonElement>('button');

    return { tableElement, errorElement, buttonElement, container };
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
      name: 'should correctly call router.push',
      props: props,
      assertions: ({ buttonElement }) => {
        fireEvent.click(buttonElement);
        expect(mockRouterReturnValue.push).toHaveBeenCalledWith(mockPushArgs);
      },
    },
    {
      name: 'should call handleClose when clicking outside the content',
      props: props,
      assertions: ({ container }) => {
        fireEvent.click(container.firstChild!);
        expect(mockRouterReturnValue.push).toHaveBeenCalledWith(mockPushArgs);
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
