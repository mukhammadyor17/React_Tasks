import { render, screen } from '@testing-library/react';
import type { Post } from '../../models/post.interface';
import CardList from './CardList';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

const posts: Post[] = [
  {
    id: 123,
    title: 'Test title',
    body: 'Lorem ipsum dolor...',
  },
];

describe('CardList component', () => {
  it('It renders CardList component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList posts={posts} isLoading={false} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test title')).toBeDefined();
  });

  it('It renders empty CardList component', () => {
    render(
      <Provider store={store}>
        <CardList posts={[]} isLoading={false} />
      </Provider>
    );
    expect(screen.getByText('Not Found!')).toBeDefined();
  });

  it('It renders Loader in CardList component', () => {
    render(
      <Provider store={store}>
        <CardList posts={[]} isLoading={true} />
      </Provider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeDefined();
  });
});
