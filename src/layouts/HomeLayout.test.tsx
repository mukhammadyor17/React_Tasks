import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import HomeLayout from './HomeLayout';

const DummyOutlet = () => <div>OutletContent</div>;

describe('HomeLayout', () => {
  it('does not render Outlet when no id param', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="post/:id" element={<DummyOutlet />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // На главной странице Outlet нет
    expect(screen.queryByText('OutletContent')).not.toBeInTheDocument();
  });

  it('renders Outlet when id param is present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/post/123']}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="post/:id" element={<DummyOutlet />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // При пути с id Outlet появляется
    expect(screen.getByText('OutletContent')).toBeInTheDocument();
  });
});
