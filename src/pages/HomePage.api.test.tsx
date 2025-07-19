import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import HomePage from './HomePage';
import ErrorBoundary from '../components/error_boundary/ErrorBoundary';
import * as getPostsModule from '../queries/get_posts';
import * as searchPostsModule from '../queries/search_posts';
import { type Post } from '../models/post.interface';
import '@testing-library/jest-dom/vitest';

const mockPosts: Post[] = [{ id: 1, title: 'Test Post', body: 'Test body' }];

describe('HomePage API Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('Calls API with correct parameters (initial load)', async () => {
    const getPostsSpy = vi
      .spyOn(getPostsModule, 'getPosts')
      .mockResolvedValueOnce({ posts: mockPosts });

    render(<HomePage />);

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledWith({ limit: 20 });
    });
  });

  it('Handles successful API responses (renders data)', async () => {
    vi.spyOn(getPostsModule, 'getPosts').mockResolvedValueOnce({
      posts: mockPosts,
    });

    render(<HomePage />);

    expect(await screen.findByText('Test Post')).toBeInTheDocument();
  });

  it('Handles API error responses (getPosts)', async () => {
    vi.spyOn(getPostsModule, 'getPosts').mockRejectedValueOnce(
      new Error('API error')
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('Calls searchPosts with correct parameters when localStorage has query', async () => {
    localStorage.setItem('searchQuery', 'react');

    const searchPostsSpy = vi
      .spyOn(searchPostsModule, 'searchPosts')
      .mockResolvedValueOnce({ posts: mockPosts });

    render(<HomePage />);

    await waitFor(() => {
      expect(searchPostsSpy).toHaveBeenCalledWith({ limit: 20, q: 'react' });
    });
  });

  it('Handles searchPosts error response', async () => {
    localStorage.setItem('searchQuery', 'fail');

    vi.spyOn(searchPostsModule, 'searchPosts').mockRejectedValueOnce(
      new Error('API search failed')
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
