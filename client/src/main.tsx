import './index.css';
import { lazy } from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
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
          return <Home />;
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
          return <Search />;
        })(),
      },
      {
        path: 'watch/:episodeid',
        element: (() => {
          const Watch = lazy(() => import('./views/watch/Watch'));
          return <Watch />;
        })(),
      },
      {
        path: 'details/:animetitle/:animeid',
        element: (() => {
          const Details = lazy(() => import('./views/details/Details'));
          return <Details />;
        })(),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <RouterProvider router={router} />
  </Suspense>
);
