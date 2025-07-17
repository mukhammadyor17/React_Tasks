import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar component', () => {
  it('Search input with button', () => {
    render(<SearchBar value="test" onChange={vi.fn()} onSearch={vi.fn()} />);
    expect(screen.getByText('Search')).toBeDefined();
  });
});
