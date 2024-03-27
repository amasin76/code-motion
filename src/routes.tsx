import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutComponent from '@/layout';

const Home = lazy(() => import('@/pages/home'));
const Studio = lazy(() => import('@/pages/studio'));
const NotFound = lazy(() => import('@/pages/not-found'));
const SignIn = lazy(() => import('@/pages/sign-in'));
const ComingSoon = lazy(() => import('@/pages/coming-soon'));

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
        path: 'about',
        element: <ComingSoon />,
      },
      {
        path: 'support',
        element: <ComingSoon />,
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
