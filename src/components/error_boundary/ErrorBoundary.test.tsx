import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Компонент, выбрасывающий ошибку
const BrokenComponent = () => {
  throw new Error('Test error from child');
};

// Компонент без ошибок
const SafeComponent = () => <div>Normal content</div>;

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders child component normally if no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('catches and displays fallback UI on child error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/we are sorry/i)).toBeInTheDocument();
  });

  it('displays error details when user opens details summary', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    const summary = screen.getByText(/error details/i);
    fireEvent.click(summary);

    expect(screen.getByText(/Test error from child/i)).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('refreshes page and clears localStorage when Refresh button is clicked', () => {
    localStorage.setItem('someKey', 'someValue');

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh page/i });

    fireEvent.click(refreshButton);

    expect(localStorage.getItem('someKey')).toBeNull();
  });
});
