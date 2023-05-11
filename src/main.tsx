import './index.css';
import { lazy } from 'react';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Signup from './views/signup/Signup';
import { isUserLoggedIn } from './api/fetchers';
import Root from './common/components/root/Root';
import ErrorPage from './views/error/error-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (() => {
          const Home = lazy(() => import('./views/home/Home'));
          return (
            <Suspense fallback={<div>Loading home</div>}>
              <Home />
            </Suspense>
          );
        })(),

        loader: isUserLoggedIn,
      },
      {
        path: '/signup',
        element: <Signup action="http://localhost:2000/signup" type="signup" />,
      },
      {
        path: '/signin',
        element: <Signup action="http://localhost:2000/signin" type="signin" />,
      },
      {
        path: '/search/:animeid',
        element: (() => {
          const Search = lazy(() => import('./views/search/Search'));
          return (
            <Suspense fallback={<div>Loading search</div>}>
              <Search />
            </Suspense>
          );
        })(),
      },
      {
        path: 'watch/:animeid/:episodeid',
        element: (() => {
          const Watch = lazy(() => import('./views/watch/Watch'));
          return (
            <Suspense fallback={<div>Loading watch</div>}>
              <Watch />
            </Suspense>
          );
        })(),
      },
      {
        path: 'details/:animetitle/:animeid',
        element: (() => {
          const Details = lazy(() => import('./views/details/Details'));
          return (
            <Suspense fallback={<div>Loading details</div>}>
              <Details />
            </Suspense>
          );
        })(),
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
