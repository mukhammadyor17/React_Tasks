import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { AppContextProvider } from './context/app_context/AppContextProvider.tsx';
import { router } from './router/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AppContextProvider>
);
