import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { routeList } from '@/data/constant/navs';
import LayoutComponent from '@/layouts';

const Home = lazy(() => import('@/pages/home'));
const NotFound = lazy(() => import('@/pages/not-found'));

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
