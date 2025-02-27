import Layout from '@components/layouts';
import Join from '@pages/Join';
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
      { path: 'users/join', element: <Join /> },
    ],
  },
]);

export default router;
