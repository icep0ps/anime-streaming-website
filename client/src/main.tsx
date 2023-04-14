import './index.css';
import React from 'react';
import Home from './views/home/Home';
import Watch from './views/watch/Watch';
import ReactDOM from 'react-dom/client';
import Root from './common/components/root/Root';
import ErrorPage from './views/error/error-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'watch/:episodeid', element: <Watch /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
