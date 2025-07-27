import { render, screen } from '@testing-library/react';
import type { Post } from '../../models/post.interface';
import CardList from './CardList';
import { MemoryRouter } from 'react-router-dom';

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
      <MemoryRouter>
        <CardList posts={posts} isLoading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test title')).toBeDefined();
  });

  it('It renders empty CardList component', () => {
    render(<CardList posts={[]} isLoading={false} />);
    expect(screen.getByText('Not Found!')).toBeDefined();
  });

  it('It renders Loader in CardList component', () => {
    render(<CardList posts={[]} isLoading={true} />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeDefined();
  });
});
