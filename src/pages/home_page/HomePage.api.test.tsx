import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import HomePage from './HomePage';
import ErrorBoundary from '../../components/error_boundary/ErrorBoundary';
import { type Post } from '../../models/post.interface';
import '@testing-library/jest-dom/vitest';

vi.mock(import('../../store/query/post_api.ts'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetPostsQuery: vi.fn(),
    useSearchPostsQuery: vi.fn(),
  };
});

import {
  useGetPostsQuery,
  useSearchPostsQuery,
} from '../../store/query/post_api';

const mockUseGetPostsQuery = vi.mocked(useGetPostsQuery);
const mockUseSearchPostsQuery = vi.mocked(useSearchPostsQuery);

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Test Post',
    body: 'Test body',
    tags: ['test'],
    reactions: { likes: 0, dislikes: 0 },
  },
];

const mockPostsResponse = {
  posts: mockPosts,
  total: 1,
  skip: 0,
  limit: 5,
};

const createMockQueryResult = (
  data: typeof mockPostsResponse | undefined,
  isLoading = false,
  isError = false
) => ({
  data,
  isLoading,
  isError,
  isFetching: isLoading,
  refetch: vi.fn(),
  error: isError ? { message: 'Mock error' } : null,
  isSuccess: !isError && !isLoading,
  isUninitialized: false,
});

describe('HomePage API Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();

    mockUseGetPostsQuery.mockReturnValue(
      createMockQueryResult(mockPostsResponse)
    );
    mockUseSearchPostsQuery.mockReturnValue(
      createMockQueryResult(mockPostsResponse)
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

  const renderWithErrorBoundary = () =>
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ErrorBoundary>
      </Provider>
    );

  it('calls API and renders data on initial load', async () => {
    renderComponent();

    expect(await screen.findByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test body')).toBeInTheDocument();

    expect(mockUseGetPostsQuery).toHaveBeenCalledWith(
      { limit: 5, skip: 0 },
      { skip: false }
    );
  });

  it('renders posts from API response', async () => {
    renderComponent();
    expect(await screen.findByText('Test Post')).toBeInTheDocument();
  });

  it('handles getPosts API error gracefully', async () => {
    mockUseGetPostsQuery.mockReturnValue(
      createMockQueryResult(undefined, false, true)
    );
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderWithErrorBoundary();

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('calls searchPosts if localStorage contains searchQuery', async () => {
    localStorage.setItem('searchQuery', 'react');

    renderComponent();

    await waitFor(() => {
      expect(mockUseSearchPostsQuery).toHaveBeenCalledWith(
        { limit: 5, q: 'react' },
        { skip: false }
      );
    });
  });

  it('handles searchPosts API error gracefully', async () => {
    localStorage.setItem('searchQuery', 'fail');
    mockUseSearchPostsQuery.mockReturnValue(
      createMockQueryResult(undefined, false, true)
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderWithErrorBoundary();

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('shows loading state when fetching data', () => {
    mockUseGetPostsQuery.mockReturnValue(
      createMockQueryResult(undefined, true, false)
    );

    renderComponent();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('switches between getPosts and searchPosts based on query', async () => {
    renderComponent();
    expect(mockUseGetPostsQuery).toHaveBeenCalled();

    localStorage.setItem('searchQuery', 'test');

    mockUseGetPostsQuery.mockReturnValue(
      createMockQueryResult(undefined, false, false)
    );
    mockUseSearchPostsQuery.mockReturnValue(
      createMockQueryResult(mockPostsResponse)
    );

    renderComponent();

    await waitFor(() =>
      expect(mockUseSearchPostsQuery).toHaveBeenCalledWith(
        { limit: 5, q: 'test' },
        { skip: false }
      )
    );
  });
});
