import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage';
import { vi } from 'vitest';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../../store/query/post_api';

vi.mock(import('../../store/query/post_api.ts'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetByIdQuery: vi.fn(),
  };
});

import { useGetByIdQuery } from '../../store/query/post_api';

const mockUseGetByIdQuery = vi.mocked(useGetByIdQuery);

const mockPostDetail = {
  id: 1,
  title: 'Test Post',
  body: 'Test body',
  tags: ['test'],
  reactions: { likes: 0, dislikes: 0 },
};

const createMockQueryResult = (
  data: typeof mockPostDetail | undefined,
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

function renderWithProviders(ui: React.ReactNode) {
  const store = configureStore({
    reducer: {
      [postApi.reducerPath]: () => ({}), // stub
    },
    middleware: (gDM) => gDM().concat(() => () => (a) => a),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('DetailPage', () => {
  beforeEach(() => {
    mockUseGetByIdQuery.mockReset();
    mockUseGetByIdQuery.mockReturnValue(createMockQueryResult(mockPostDetail));
  });

  it('renders post details correctly', async () => {
    mockUseGetByIdQuery.mockReturnValue(
      createMockQueryResult({
        id: 1,
        title: 'Static title',
        body: 'Static body',
        tags: ['tagA'],
        reactions: { likes: 7, dislikes: 1 },
      })
    );

    renderWithProviders(<DetailPage />);

    expect(await screen.findByText('Static title')).toBeInTheDocument();
    expect(await screen.findByText('Static body')).toBeInTheDocument();
    expect(await screen.findByText('tagA')).toBeInTheDocument();
    expect(await screen.findByText('👍🏻 7')).toBeInTheDocument();
    expect(await screen.findByText('👎🏻 1')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseGetByIdQuery.mockReturnValue(createMockQueryResult(undefined, true));

    renderWithProviders(<DetailPage />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    mockUseGetByIdQuery.mockReturnValue(
      createMockQueryResult(undefined, false, true)
    );

    renderWithProviders(<DetailPage />);
    expect(
      await screen.findByText(/Failed to load post details./i)
    ).toBeInTheDocument();
  });
});
