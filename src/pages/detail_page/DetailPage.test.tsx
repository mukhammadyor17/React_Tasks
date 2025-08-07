import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage';
import { vi } from 'vitest';

vi.mock('../../queries/get_by_id', () => ({
  getPostById: vi.fn(() =>
    Promise.resolve({
      id: 1,
      title: 'Static title',
      body: 'Static body',
      tags: ['tagA'],
      reactions: { likes: 7, dislikes: 1 },
    })
  ),
}));

describe('DetailPage (static mock)', () => {
  it('renders post details after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Static title')).toBeInTheDocument();
    expect(await screen.findByText('Static body')).toBeInTheDocument();
    expect(await screen.findByText('tagA')).toBeInTheDocument();
    expect(await screen.findByText('👍🏻 7')).toBeInTheDocument();
    expect(await screen.findByText('👎🏻 1')).toBeInTheDocument();
  });
});
