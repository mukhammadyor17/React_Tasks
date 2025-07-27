import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import * as getPostsModule from '../../queries/get_posts';
import * as searchPostsModule from '../../queries/search_posts';

const mockPosts = [{ id: 1, title: 'Test Post', body: 'Hello' }];

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('HomePage component', () => {
  it('It renders HomePage component', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('Retrieves saved search term on component mount', async () => {
    localStorage.setItem('searchQuery', 'test');

    const searchSpy = vi
      .spyOn(searchPostsModule, 'searchPosts')
      .mockResolvedValue({ posts: mockPosts });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue('test')).toBeInTheDocument();

    await waitFor(() =>
      expect(searchSpy).toHaveBeenCalledWith({ limit: 5, q: 'test' })
    );
  });

  it('Overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchQuery', 'old query');

    vi.spyOn(getPostsModule, 'getPosts').mockResolvedValue({
      posts: mockPosts,
    });

    const searchSpy = vi
      .spyOn(searchPostsModule, 'searchPosts')
      .mockResolvedValue({ posts: mockPosts });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue('old query')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'new query' } });

    fireEvent.click(button);

    await waitFor(() =>
      expect(searchSpy).toHaveBeenCalledWith({ limit: 5, q: 'new query' })
    );

    expect(localStorage.getItem('searchQuery')).toBe('new query');
  });
});
