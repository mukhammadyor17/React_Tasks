import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import * as getPostsModule from '../../queries/get_posts';
import * as searchPostsModule from '../../queries/search_posts';
import '@testing-library/jest-dom/vitest';

const mockPosts = [{ id: 1, title: 'Test', body: 'Body content' }];

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('HomePage Integration Tests', () => {
  it('Makes initial API call on component mount when no saved search term', async () => {
    const getPostsMock = vi
      .spyOn(getPostsModule, 'getPosts')
      .mockResolvedValue({ posts: mockPosts });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPostsMock).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'example');

    const searchPostsMock = vi
      .spyOn(searchPostsModule, 'searchPosts')
      .mockResolvedValue({ posts: mockPosts });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue('example')).toBeInTheDocument();

    await waitFor(() => {
      expect(searchPostsMock).toHaveBeenCalledWith({
        limit: 5,
        q: 'example',
      });
    });

    expect(await screen.findByText('Test')).toBeInTheDocument();
  });

  it('Manages loading states during API calls', async () => {
    let resolvePromise: (value: unknown) => void;

    const loadingPromise = new Promise((res) => {
      resolvePromise = res;
    });

    vi.spyOn(getPostsModule, 'getPosts').mockReturnValue(loadingPromise);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Проверка: Loader виден во время загрузки
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Завершаем загрузку
    resolvePromise!({ posts: mockPosts });

    await waitFor(() => {
      // Проверка: Loader исчез после загрузки
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    // Проверка: Контент отображается
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });
});
