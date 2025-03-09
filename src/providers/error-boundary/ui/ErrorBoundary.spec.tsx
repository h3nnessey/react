import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Error component');
};

describe('ErrorBoundary component', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="children">Lorem ipsum dolor sit amet.</div>
      </ErrorBoundary>
    );

    const childrenElement = screen.getByTestId('children');

    expect(childrenElement).toBeInTheDocument();
  });

  it('should render fallback when there is an error', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="fallback">Fallback</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const fallbackElement = screen.getByTestId('fallback');

    expect(fallbackElement).toBeInTheDocument();
  });

  it('should render default ErrorMessage fallback if fallback is not provided', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const errorMessageElement = screen.getByRole('error-message');

    expect(errorMessageElement).toBeInTheDocument();
  });
});
