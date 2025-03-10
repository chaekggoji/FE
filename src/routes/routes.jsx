import Layout from '@components/layouts';
import Create from '@pages/study/Create';
import Guide from '@pages/Guide';
import SignUp from '@pages/auth/SignUp';
import Login from '@pages/auth/Login';
import Books from '@pages/profile/Books';
import Edit from '@pages/profile/Edit';
import Studies from '@pages/profile/Studies';
import Debates from '@pages/study/detail/Debates';
import StudyDetailHome from '@pages/study/detail/Index';
import Manage from '@pages/study/detail/Manage';
import Notices from '@pages/study/detail/Notices';
import Phrases from '@pages/study/detail/Phrases';
import StudyHome from '@pages/study/Index';
import Supabase from '@pages/Supabase';
import Test from '@pages/Test';
import ProtectedRoute from '@routes/ProtectedRoute';
import { createBrowserRouter } from 'react-router';
import ProfileHome from '@pages/profile/Index';
import Error from '@pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      /* 로그인 전 접근 가능 */
      {
        path: 'guide',
        element: <Guide />,
      },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },

      /* 로그인 후 접근 가능 */
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <StudyHome /> },
          { path: 'study/create', element: <Create /> },

          // 스터디 상세 페이지
          {
            path: 'study/:studyId',
            children: [
              {
                index: true,
                element: <StudyDetailHome />,
              },
              {
                path: 'notices',
                element: <Notices />,
              },
              {
                path: 'debates',
                element: <Debates />,
              },
              {
                path: 'phrases',
                element: <Phrases />,
              },
              {
                path: 'manage',
                element: <Manage />,
              },
            ],
          },

          // 마이 페이지
          {
            path: 'profile/:userId',
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <ProfileHome />,
              },
              {
                path: 'books',
                element: <Books />,
              },
              {
                path: 'studies',
                element: <Studies />,
              },
              // 로그인한 유저 id와 :userId가 같을 때만 이동
              {
                path: 'edit',
                element: <Edit />,
              },
            ],
          },
        ],
      },

      // 존재하지 않는 페이지 처리 (404)
      { path: '*', element: <Error /> },

      // 테스팅 라우트
      {
        path: 'test',
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
