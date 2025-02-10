import { describe, it, expect } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { routes } from './router';

describe('Router', () => {
  it('should render main page', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('should render character details', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/123'] });
    render(<RouterProvider router={router} />);

    const detailsElement = screen.getByRole('details');
    expect(detailsElement).toBeInTheDocument();
  });

  it('should render not found page', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/unknown/route'],
    });
    render(<RouterProvider router={router} />);

    const notFoundElement = screen.getByRole('not-found');
    expect(notFoundElement).toBeInTheDocument();
  });
});
