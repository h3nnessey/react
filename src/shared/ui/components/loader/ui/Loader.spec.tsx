import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader, LoaderProps } from './Loader';

describe('Loader Component', () => {
  const renderLoader = (props: LoaderProps = {}) => {
    return render(<Loader {...props} />);
  };

  it('should apply className', () => {
    const className = 'qwe';
    renderLoader({ className });

    const loaderElement = screen.getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass(className);
  });
});
