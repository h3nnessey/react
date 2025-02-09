import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import styles from './Header.module.scss';

describe('Header Component', () => {
  it('should render with default className', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass(styles.header);
  });
});
