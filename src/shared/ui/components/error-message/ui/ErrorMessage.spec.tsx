import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage component', () => {
  it('should render correctly', () => {
    const message = 'Something went wrong';

    render(<ErrorMessage message={message} />);

    const errorElement = screen.getByRole<HTMLDivElement>('error-message');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(message);
  });
});
