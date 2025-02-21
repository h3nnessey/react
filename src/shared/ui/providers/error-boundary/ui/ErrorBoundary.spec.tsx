import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, MESSAGE } from './ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  it('should render children if no error', () => {
    const text = 'no error';

    render(
      <ErrorBoundary>
        <p>{text}</p>
      </ErrorBoundary>
    );

    const childrenElement = screen.getByText(text);
    expect(childrenElement).toBeInTheDocument();
  });

  it('should catch error and render fallback', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(MESSAGE);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render provided fallback', () => {
    const fallbackText = 'custom fallback';
    const fallback = <div>{fallbackText}</div>;

    render(
      <ErrorBoundary fallback={fallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const fallbackElement = screen.getByText(fallbackText);
    expect(fallbackElement).toBeInTheDocument();
  });

  it('should reload the page on button click', async () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button');
    fireEvent.click(reloadButton);
    expect(reloadMock).toHaveBeenCalled();
  });
});
