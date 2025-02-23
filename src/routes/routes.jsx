import Layout from '@components/layouts';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    index: '/',
    element: <Layout />,
  },
]);

export default router;
