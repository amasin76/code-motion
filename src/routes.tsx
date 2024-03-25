import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutComponent from '@/layout';

const Home = lazy(() => import('@/pages/home'));
const Studio = lazy(() => import('@/pages/studio'));
const NotFound = lazy(() => import('@/pages/not-found'));
const SignIn = lazy(() => import('@/pages/sign-in'));

const routes = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'studio',
        element: <Studio />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => {
  return (
    <Suspense fallback="loading...">
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
