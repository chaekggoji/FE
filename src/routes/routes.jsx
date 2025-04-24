import Layout from '@components/layouts/Index';
import Create from '@pages/study/Create';
import Guide from '@pages/Guide';
import SignUp from '@pages/auth/SignUp';
import Login from '@pages/auth/Login';
import Books from '@pages/profile/Books';
import Edit from '@pages/profile/Edit';
import Studies from '@pages/profile/Studies';
import StudyDetailHome from '@pages/study/detail/Index';
import Manage from '@pages/study/detail/Manage';
import Phrases from '@pages/study/detail/Phrases';
import StudyHome from '@pages/study/Index';
import ProtectedRoute from '@routes/ProtectedRoute';
import ProfileHome from '@pages/profile/Index';
import Error from '@pages/error/Error';
import StudyDetailLayout from '@pages/study/detail/StudyDetailLayout';
import { createBrowserRouter, Navigate } from 'react-router';
import PostWrite from '@components/modules/post/PostWrite';
import PostDetail from '@components/modules/post/PostDetail';
import Board from '@components/modules/board/Board';
import PostEdit from '@components/modules/post/PostEdit';
import NoPermission from '@pages/error/NoPermission';
import WrongRequest from '@pages/error/WrongRequest';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
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
            element: <StudyDetailLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="home" replace />,
              },
              {
                path: 'home',
                element: <StudyDetailHome />,
              },
              {
                path: ':boardType',
                // 유효한 boardType이 아닐 시 에러 페이지로 이동
                loader: ({ params }) => {
                  const validTypes = ['notice', 'debate'];
                  if (!validTypes.includes(params.boardType)) {
                    throw new Response('Not Found', { status: 404 });
                  }
                  return null;
                },
                children: [
                  { index: true, element: <Board /> },
                  { path: 'write', element: <PostWrite /> },
                  {
                    path: ':postId',
                    children: [
                      {
                        index: true,
                        element: <PostDetail />,
                      },
                      { path: 'edit', element: <PostEdit /> },
                    ],
                  },
                ],
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

      /* 에러 페이지 */
      { path: '403', element: <NoPermission /> },
      { path: '406', element: <WrongRequest /> },
    ],
  },
]);

export default router;
