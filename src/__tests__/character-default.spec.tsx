import { render } from '@testing-library/react';
import CharacterDefault from '@/app/@character/default';
import { describe, expect, it } from 'vitest';

describe('@character/default component', () => {
  it('should return null', () => {
    const { container } = render(<CharacterDefault />);

    expect(container.firstChild).toBeNull();
  });
});
