import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { AppContextProvider } from './context/app_context/AppContextProvider';
import { MemoryRouter } from 'react-router';

describe('App', () => {
  it('renders the App component', () => {
    render(
      <AppContextProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppContextProvider>
    );
  });
});
