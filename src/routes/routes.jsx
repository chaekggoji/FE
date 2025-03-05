import Layout from '@components/layouts';
import Join from '@pages/Join';
import Login from '@pages/Login';
import Supabase from '@pages/Supabase';
import Test from '@pages/Test';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    index: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Test />,
      },
      { path: 'users/login', element: <Login /> },
      { path: 'users/join', element: <Join /> },
      {
        path: 'supabase',
        element: <Supabase />,
      },
      {
        path: 'create',
        element: <Create />,
      },
    ],
  },
]);

export default router;
