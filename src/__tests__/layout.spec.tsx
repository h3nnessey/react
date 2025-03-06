import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__';
import Layout from '@/pagess/layout';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      name: '',
    },
  }),
}));

global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('Layout component', () => {
  it('should render correctly', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="children">children</div>
      </Layout>
    );

    const children = screen.getByTestId('children');

    expect(children).toBeInTheDocument();
  });
});
