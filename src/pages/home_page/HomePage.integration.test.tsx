// HomePage.integration.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import HomePage from './HomePage';
import * as postApi from '../../store/query/post_api';
import '@testing-library/jest-dom/vitest';

const mockPosts = [{ id: 1, title: 'Test', body: 'Body content' }];

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('HomePage Integration Tests with RTK Query', () => {
  it('Makes initial API call on component mount when no saved search term', async () => {
    vi.spyOn(postApi, 'useGetPostsQuery').mockReturnValue({
      data: { posts: mockPosts },
      isLoading: false,
      isError: false,
    } as never);

    vi.spyOn(postApi, 'useSearchPostsQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as never);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'example');

    vi.spyOn(postApi, 'useSearchPostsQuery').mockReturnValue({
      data: { posts: mockPosts },
      isLoading: false,
      isError: false,
    } as never);

    vi.spyOn(postApi, 'useGetPostsQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as never);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByDisplayValue('example')).toBeInTheDocument();
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('Manages loading states during API calls', async () => {
    vi.spyOn(postApi, 'useGetPostsQuery').mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    } as never);

    vi.spyOn(postApi, 'useSearchPostsQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as never);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
