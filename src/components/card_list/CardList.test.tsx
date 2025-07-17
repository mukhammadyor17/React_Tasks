import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { Post } from '../../models/post.interface';

const post: Post[] = [
  {
    id: 123,
    title: 'Test title',
    body: 'Lorem ipsum dolor...',
  },
];

describe('CardList component', () => {
  it('It renders CardList component', () => {
    render(<CardList posts={post} isLoading={false} />);
    expect(screen.getByText('Test title')).toBeDefined();
  });
});
