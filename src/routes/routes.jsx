import Layout from '@components/layouts';
import StudyHome from '@pages/study/StudyHome';
import Notices from '@pages/study/Notices';
import StudyLayout from '@pages/study/StudyLayout';
import Supabase from '@pages/Supabase';
import Test from '@pages/Test';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
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
        path: 'study/:id',
        element: <StudyLayout />,
        children: [
          {
            path: 'home',
            element: <StudyHome />,
          },
          {
            path: 'notices',
            element: <Notices />,
          },
        ],
      },
    ],
  },
]);

export default router;
