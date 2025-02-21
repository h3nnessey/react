import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '@/shared/ui/components';

describe('ErrorMessage Component', () => {
  const message = 'error message';

  const renderErrorMessage = (props = {}) => {
    return render(<ErrorMessage message={message} {...props} />);
  };

  it('should render error message', () => {
    renderErrorMessage();

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it('should apply className', () => {
    const className = 'qwe';
    renderErrorMessage({ className });

    const containerElement = screen.getByRole('error');
    expect(containerElement).toHaveClass(className);
  });

  it('should render children', () => {
    const text = 'children text';
    renderErrorMessage({ children: <p>{text}</p> });

    const childrenElement = screen.getByText(text);
    expect(childrenElement).toBeInTheDocument();
  });
});
