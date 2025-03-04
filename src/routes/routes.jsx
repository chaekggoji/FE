import Layout from '@components/layouts';
import Home from '@pages/study/Home';
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
        path: 'study',
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;
