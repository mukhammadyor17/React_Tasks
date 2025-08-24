import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
import type { User } from '../../store/features/user/userSlice';

describe('UserCard', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    age: 25,
    email: 'john.doe@example.com',
    country: 'United States',
    password: 'password123',
    confirmPassword: 'password123',
    gender: 'male',
    file: 'https://example.com/avatar.jpg',
    accept: true,
    timestamp: 1640995200000,
  };

  it('renders user card with all user information', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('25 years')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Accepted')).toBeInTheDocument();
  });

  it('renders avatar when user has file', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const avatar = screen.getByAltText("John Doe's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('does not render avatar when user has no file', () => {
    const userWithoutFile = { ...mockUser, file: '' };
    render(<UserCard user={userWithoutFile} isNew={false} />);

    const avatar = screen.queryByAltText("John Doe's avatar");
    expect(avatar).not.toBeInTheDocument();
  });

  it('displays terms acceptance correctly when user accepts', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const termsBadge = screen.getByText('Accepted');
    expect(termsBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('displays terms acceptance correctly when user does not accept', () => {
    const userNotAccepting = { ...mockUser, accept: false };
    render(<UserCard user={userNotAccepting} isNew={false} />);

    const termsBadge = screen.getByText('Not Accepted');
    expect(termsBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('displays user ID in a badge format', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const idBadge = screen.getByText('ID: 1');
    expect(idBadge).toHaveClass(
      'text-xs',
      'text-gray-500',
      'bg-gray-100',
      'px-2',
      'py-1',
      'rounded'
    );
  });

  it('displays user name with proper styling', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const name = screen.getByText('John Doe');
    expect(name).toHaveClass(
      'font-semibold',
      'text-lg',
      'text-gray-800',
      'truncate'
    );
  });

  it('displays email with truncation', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const email = screen.getByText('john.doe@example.com');
    expect(email).toHaveClass('truncate');
  });

  it('displays age with "years" suffix', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    expect(screen.getByText('25 years')).toBeInTheDocument();
  });

  it('capitalizes gender text', () => {
    render(<UserCard user={mockUser} isNew={false} />);

    const gender = screen.getByText('male');
    expect(gender).toHaveClass('capitalize');
  });

  it('renders with different user data', () => {
    const differentUser: User = {
      id: 2,
      name: 'Jane Smith',
      age: 30,
      email: 'jane.smith@example.com',
      country: 'Canada',
      password: 'password456',
      confirmPassword: 'password456',
      gender: 'female',
      file: '',
      accept: false,
      timestamp: 1640995200000,
    };

    render(<UserCard user={differentUser} isNew={true} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('30 years')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Not Accepted')).toBeInTheDocument();
  });
});
