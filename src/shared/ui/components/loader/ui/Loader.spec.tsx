import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    const loaderElement = screen.getByRole<HTMLDivElement>('loader');

    expect(loaderElement).toBeInTheDocument();
  });
});
