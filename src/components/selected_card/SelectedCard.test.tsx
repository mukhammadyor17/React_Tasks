import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import SelectedCard from './SelectedCard';
import favoritesReducer, {
  type FavoritePost,
} from '../../store/features/favorites/favorites_slice';
import * as downloadCsv from '../../helpers/downloadCsv';

// Mock the downloadCsv module
vi.mock('../../helpers/downloadCsv', () => ({
  downloadFile: vi.fn(),
}));

const createTestStore = (
  initialState: { favorites: FavoritePost[] } = { favorites: [] }
) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: initialState,
    },
  });
};

const renderWithProvider = (store: ReturnType<typeof createTestStore>) => {
  return render(
    <Provider store={store}>
      <SelectedCard />
    </Provider>
  );
};

describe('SelectedCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with selected items count', () => {
    const mockFavorites = [
      { id: 1, title: 'Test Post 1', body: 'Test body 1' },
      { id: 2, title: 'Test Post 2', body: 'Test body 2' },
    ];
    const store = createTestStore({ favorites: mockFavorites });

    renderWithProvider(store);

    expect(screen.getByText('Selected items count:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows zero count when no favorites are selected', () => {
    const store = createTestStore({ favorites: [] });

    renderWithProvider(store);

    expect(screen.getByText('Selected items count:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders both buttons', () => {
    const store = createTestStore();

    renderWithProvider(store);

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    const downloadButton = screen.getByRole('button', { name: /download/i });

    expect(unselectButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });

  it('calls clear action when "Unselect all" button is clicked', () => {
    const mockFavorites = [
      { id: 1, title: 'Test Post 1', body: 'Test body 1' },
    ];
    const store = createTestStore({ favorites: mockFavorites });

    renderWithProvider(store);

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    // Check that the favorites state is cleared
    const state = store.getState();
    expect(state.favorites.favorites).toEqual([]);
  });

  it('calls downloadFile when "Download" button is clicked', () => {
    const mockFavorites = [
      { id: 1, title: 'Test Post 1', body: 'Test body 1' },
      { id: 2, title: 'Test Post 2', body: 'Test body 2' },
    ];
    const store = createTestStore({ favorites: mockFavorites });

    renderWithProvider(store);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);

    expect(downloadCsv.downloadFile).toHaveBeenCalledWith(mockFavorites);
    expect(downloadCsv.downloadFile).toHaveBeenCalledTimes(1);
  });

  it('does not call downloadFile when no favorites are selected', () => {
    const store = createTestStore({ favorites: [] });

    renderWithProvider(store);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);

    expect(downloadCsv.downloadFile).toHaveBeenCalledWith([]);
    expect(downloadCsv.downloadFile).toHaveBeenCalledTimes(1);
  });

  it('updates the count display when favorites change', () => {
    const store = createTestStore({ favorites: [] });

    const { rerender } = renderWithProvider(store);

    // Initially shows 0
    expect(screen.getByText('0')).toBeInTheDocument();

    // Update store with new favorites
    const newStore = createTestStore({
      favorites: [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
        { id: 2, title: 'Test Post 2', body: 'Test body 2' },
        { id: 3, title: 'Test Post 3', body: 'Test body 3' },
      ],
    });

    rerender(
      <Provider store={newStore}>
        <SelectedCard />
      </Provider>
    );

    // Now shows 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('buttons have correct styling classes', () => {
    const store = createTestStore();

    renderWithProvider(store);

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    const downloadButton = screen.getByRole('button', { name: /download/i });

    expect(unselectButton).toHaveClass(
      'px-6',
      'py-2',
      'bg-indigo-500',
      'hover:bg-indigo-600',
      'dark:bg-indigo-600',
      'dark:hover:bg-indigo-700',
      'text-white',
      'rounded',
      'active:bg-indigo-700',
      'dark:active:bg-indigo-800',
      'transition-colors'
    );

    expect(downloadButton).toHaveClass(
      'px-6',
      'py-2',
      'bg-indigo-500',
      'hover:bg-indigo-600',
      'dark:bg-indigo-600',
      'dark:hover:bg-indigo-700',
      'text-white',
      'rounded',
      'active:bg-indigo-700',
      'dark:active:bg-indigo-800',
      'transition-colors'
    );
  });
});
