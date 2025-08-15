'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { AppContextProvider } from '../context/app_context/AppContextProvider';
import { store } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <Provider store={store}>{children}</Provider>
    </AppContextProvider>
  );
}
