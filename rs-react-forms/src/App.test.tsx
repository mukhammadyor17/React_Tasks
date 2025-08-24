import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import '@testing-library/jest-dom/vitest';

describe('App', () => {
  it('renders the App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('renders the controlled modal button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const controlledButton = screen.getByRole('button', {
      name: /show controlled modal/i,
    });
    expect(controlledButton).toBeInTheDocument();
    expect(controlledButton).toHaveClass(
      'px-10',
      'py-5',
      'rounded-xl',
      'text-white',
      'bg-indigo-500'
    );
  });

  it('renders the uncontrolled modal button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const uncontrolledButton = screen.getByRole('button', {
      name: /show uncontrolled modal/i,
    });
    expect(uncontrolledButton).toBeInTheDocument();
    expect(uncontrolledButton).toHaveClass(
      'px-10',
      'py-5',
      'rounded-xl',
      'text-white',
      'bg-indigo-500'
    );
  });

  it('renders both buttons with correct styling classes', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    buttons.forEach((button) => {
      expect(button).toHaveClass(
        'px-10',
        'py-5',
        'rounded-xl',
        'text-white',
        'bg-indigo-500'
      );
    });
  });
});
