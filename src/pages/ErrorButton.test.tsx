import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import ErrorBoundary from '../components/error_boundary/ErrorBoundary';
import HomePage from './HomePage';
import '@testing-library/jest-dom/vitest';

describe('Error Button Tests', () => {
  it('Throws error when test button is clicked and shows fallback UI', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button', {
      name: /test error boundary/i,
    });
    fireEvent.click(errorButton);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
