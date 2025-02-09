import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import { CharacterDetails } from '@/entities/character';
import { MainPage, NotFoundPage } from '@/pages';

describe('Router', () => {
  it('should render main page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render character details', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render not found page', () => {
    render(
      <MemoryRouter initialEntries={['/unknown/route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
