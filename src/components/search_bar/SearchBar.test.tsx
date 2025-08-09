import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('Renders search input and search button', () => {
    const value = '';
    const onChange = vi.fn();
    const onSearch = vi.fn();
    const onRefetch = vi.fn();

    render(
      <SearchBar
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onRefetch={onRefetch}
      />
    );

    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText('Search...');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Search/);
    expect(input).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();
    const onRefetch = vi.fn();

    render(
      <SearchBar
        value=""
        onChange={onChange}
        onSearch={onSearch}
        onRefetch={onRefetch}
      />
    );
    const input = screen.getByPlaceholderText('Search...');

    expect(input).toHaveValue('');
  });
});
