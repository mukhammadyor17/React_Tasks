import { render, screen } from '@testing-library/react';
import CardItem from './CardItem';
import { MemoryRouter } from 'react-router-dom';
import type { Post } from '../../models/post.interface';

const post: Post = {
  id: 123,
  title: 'Test title',
  body: 'Lorem ipsum dolor...',
};

describe('Card Item component', () => {
  it('It renders CardItem component with title and body', () => {
    render(
      <MemoryRouter>
        <CardItem post={post} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test title')).toBeDefined();
    expect(screen.getByText('Lorem ipsum dolor...')).toBeInTheDocument();
  });
});
