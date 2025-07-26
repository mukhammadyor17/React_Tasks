import { createBrowserRouter } from 'react-router';

import App from '../App';
import HomeLayout from '../layouts/HomeLayout';
import AboutPage from '../pages/about_page/AboutPage';
import DetailPage from '../pages/detail_page/DetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomeLayout />,
        children: [
          {
            path: '',
            index: true,
            element: null,
          }, // когда ничего не выбрано
          {
            path: 'post/:id',
            element: <DetailPage />,
          },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);
