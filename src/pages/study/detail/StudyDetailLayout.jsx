import { NavLink, Outlet, useParams } from 'react-router';

// Todo
// 1. home 없이 nav active 구현 방법 찾기
// 2. 기본 좌우 여백 해결하기
const StudyDetailLayout = () => {
  const { studyId } = useParams();
  return (
    <div className="flex">
      <nav className="w-[220px] bg-primary-100">
        <NavLink
          to="home"
          className={({ isActive }) =>
            [
              'block h-[52px] px-[20px] py-[14px]',
              isActive ? 'bg-primary-200' : '',
            ].join(' ')
          }
        >
          스터디 홈
        </NavLink>
        <NavLink
          to="notices"
          className={({ isActive }) =>
            [
              'block h-[52px] px-[20px] py-[14px]',
              isActive ? 'bg-primary-200' : '',
            ].join(' ')
          }
        >
          공지사항
        </NavLink>
        <NavLink
          to="debates"
          className={({ isActive }) =>
            [
              'block h-[52px] px-[20px] py-[14px]',
              isActive ? 'bg-primary-200' : '',
            ].join(' ')
          }
        >
          토론 나눠요
        </NavLink>
        <NavLink
          to="phrases"
          className={({ isActive }) =>
            [
              'block h-[52px] px-[20px] py-[14px]',
              isActive ? 'bg-primary-200' : '',
            ].join(' ')
          }
        >
          구절 공유해요
        </NavLink>
        <NavLink
          to="manage"
          className={({ isActive }) =>
            [
              'block h-[52px] px-[20px] py-[14px]',
              isActive ? 'bg-primary-200' : '',
            ].join(' ')
          }
        >
          스터디원 관리
        </NavLink>
      </nav>
      <main className="grow basis-0">
        <Outlet />
      </main>
    </div>
  );
};

export default StudyDetailLayout;
