import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 and message', () => {
    render(<NotFoundPage />);

    // Проверка заголовка
    expect(screen.getByText('404')).toBeInTheDocument();
    // Проверка текста
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });
});
