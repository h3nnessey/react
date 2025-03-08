import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { characterMock, renderWithProviders } from '@/__mocks__';
import {
  CharacterDetails,
  type CharacterDetailsProps,
} from './CharacterDetails';

describe('CharacterDetails component', () => {
  const props: CharacterDetailsProps = {
    data: characterMock,
    error: null,
  };

  const renderCharacterDetails = (
    characterDetailsProps: CharacterDetailsProps = props
  ) => {
    renderWithProviders(<CharacterDetails {...characterDetailsProps} />);

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
  ];

  testCases.forEach(({ name, props, assertions }) => {
    it(name, () => {
      const renderResult = renderCharacterDetails(props);

      assertions(renderResult);
    });
  });
});
