import Layout from '@components/layouts';
import Login from '@pages/Login';
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
    ],
  },
]);

export default router;
