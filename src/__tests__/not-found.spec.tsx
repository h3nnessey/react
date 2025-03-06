import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage component', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('error-message')).toBeInTheDocument();
  });
});
