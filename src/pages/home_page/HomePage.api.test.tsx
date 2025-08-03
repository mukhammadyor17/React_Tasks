import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import HomePage from './HomePage';
import ErrorBoundary from '../../components/error_boundary/ErrorBoundary';
import * as getPostsModule from '../../queries/get_posts';
import * as searchPostsModule from '../../queries/search_posts';
import { type Post } from '../../models/post.interface';
import '@testing-library/jest-dom/vitest';

const mockPosts: Post[] = [{ id: 1, title: 'Test Post', body: 'Test body' }];

describe('HomePage API Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('Calls API and renders data on initial load (MSW)', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    // Ждём появления данных из мокнутого ответа
    expect(await screen.findByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor amet')).toBeInTheDocument();
  });

  it('Handles successful API responses (renders data)', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText('Test title')).toBeInTheDocument();
  });

  it('Handles API error responses (getPosts)', async () => {
    vi.spyOn(getPostsModule, 'getPosts').mockRejectedValueOnce(
      new Error('API error')
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <ErrorBoundary>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ErrorBoundary>
      </Provider>
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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(searchPostsSpy).toHaveBeenCalledWith({ limit: 5, q: 'react' });
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
      <Provider store={store}>
        <ErrorBoundary>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ErrorBoundary>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
