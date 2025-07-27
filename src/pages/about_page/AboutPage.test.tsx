import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders author, location and links', () => {
    render(<AboutPage />);

    // Проверяем основные элементы
    expect(
      screen.getByRole('heading', { name: /About This Application/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Mukhammadyorkhon Turskhanov/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Kazakhstan/i)).toBeInTheDocument();

    // Проверяем наличие ссылок
    expect(screen.getByRole('link', { name: /Register/i })).toHaveAttribute(
      'href',
      'https://app.rs.school/registry/student'
    );

    expect(screen.getByRole('link', { name: /Main page/i })).toHaveAttribute(
      'href',
      'https://app.rs.school'
    );

    expect(screen.getByRole('link', { name: /Click here/i })).toHaveAttribute(
      'href',
      'https://github.com/rolling-scopes-school'
    );
  });
});
