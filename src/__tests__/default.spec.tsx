import { describe, it, expect } from 'vitest';
import DefaultExport from '@/app/default';
import PageComponent from '@/app/page';

describe('default.tsx component', () => {
  it('should re-export the default export from ./page', () => {
    expect(DefaultExport).toBe(PageComponent);
  });
});
