import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '@/app/loading';

describe('Loading component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });
});
