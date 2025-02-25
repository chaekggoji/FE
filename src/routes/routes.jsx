import Layout from '@components/layouts';
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
    ],
  },
]);

export default router;
