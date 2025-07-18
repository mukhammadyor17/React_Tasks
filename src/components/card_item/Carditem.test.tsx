import { render, screen } from '@testing-library/react';
import CardItem from './CardItem';
import type { Post } from '../../models/post.interface';

const post: Post = {
  id: 123,
  title: 'Test title',
  body: 'Lorem ipsum dolor...',
};

describe('Card Item component', () => {
  it('It renders CardItem component with title and body', () => {
    render(<CardItem post={post} />);
    expect(screen.getByText('Test title')).toBeDefined();
    expect(screen.getByText('Lorem ipsum dolor...')).toBeInTheDocument();
  });
});
