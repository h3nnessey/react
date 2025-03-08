import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '@/app/@character/[id]/loading';

describe('@character/[id]/loading component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    const loadingElement = screen.getByRole<HTMLDivElement>('loader');

    expect(loadingElement).toBeInTheDocument();
  });
});
