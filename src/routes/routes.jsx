import Layout from '@components/layouts';
import Create from '@pages/Create';
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
