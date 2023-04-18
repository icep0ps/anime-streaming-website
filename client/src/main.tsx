import './index.css';
import React from 'react';
import Home from './views/home/Home';
import Watch from './views/watch/Watch';
import ReactDOM from 'react-dom/client';
import Signup from './views/signup/Signup';
import Details from './views/details/Details';
import Root from './common/components/root/Root';
import ErrorPage from './views/error/error-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/signup',
        element: <Signup action="http://localhost:3000/signup" type="signup" />,
      },
      {
        path: '/signin',
        element: <Signup action="http://localhost:2000/signin" type="signin" />,
      },
      { path: 'watch/:episodeid', element: <Watch /> },
      { path: 'details/:animeid', element: <Details /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
