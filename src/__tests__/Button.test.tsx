import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui';

describe('Button', () => {
  test('should render text', async () => {
    const text = 'test';

    render(<Button>{text}</Button>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
