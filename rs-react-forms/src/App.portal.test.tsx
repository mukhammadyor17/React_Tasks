import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import '@testing-library/jest-dom/vitest';

describe('App with portals', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('renders controlled modal inside portal when button is clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = screen.getByRole('button', {
      name: /show controlled modal/i,
    });

    fireEvent.click(button);

    expect(modalRoot).toContainElement(
      screen.getByRole('dialog', { hidden: true })
    );
  });

  it('renders uncontrolled modal inside portal when button is clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = screen.getByRole('button', {
      name: /show uncontrolled modal/i,
    });

    fireEvent.click(button);

    const dialog = modalRoot.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
  });
});
