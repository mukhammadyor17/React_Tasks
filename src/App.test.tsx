import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { AppContextProvider } from './context/app_context/AppContextProvider';

describe('App', () => {
  it('renders the App component', () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
  });
});
