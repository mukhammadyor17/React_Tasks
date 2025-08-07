import { render } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('HomePage component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
  });
});
