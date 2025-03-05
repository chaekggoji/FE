import Layout from '@components/layouts';
import Login from '@pages/auth/Login';
import SignUp from '@pages/auth/SignUp';
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
      { path: 'users/signup', element: <SignUp /> },
      {
        path: 'supabase',
        element: <Supabase />,
      },
    ],
  },
]);

export default router;
