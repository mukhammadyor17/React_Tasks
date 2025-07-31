import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AppContextProvider } from './context/app_context/AppContextProvider.tsx';
import { router } from './router/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
