import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import { SearchForm } from './SearchForm';

const mockUseRouter = vi.hoisted(() => vi.fn());
const mockUseSearchParams = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', async () => {
  const mod = await import('next/navigation');
  return {
    ...mod,
    useRouter: mockUseRouter,
    useSearchParams: mockUseSearchParams,
  };
});

describe('SearchForm component', () => {
  const name = 'rick';
  let mockPush: Mock;

  const renderSearchForm = () => {
    return renderWithProviders(<SearchForm />);
  };

  beforeEach(() => {
    mockPush = vi.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ name }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ name: '' }));
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    expect(formElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('should properly handle form submission with trimmed value', () => {
    const value = '  morty      ';

    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    fireEvent.input(inputElement, { target: { value } });
    fireEvent.submit(formElement);

    expect(mockPush).toHaveBeenCalledWith(`/?name=${value.trim()}`);
  });

  it('should properly handle form submission with no changes', () => {
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');

    fireEvent.submit(formElement);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should properly handle form submission with empty value', () => {
    renderSearchForm();

    const formElement = screen.getByRole<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole<HTMLInputElement>('input');

    fireEvent.input(inputElement, { target: { value: '' } });
    fireEvent.submit(formElement);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
