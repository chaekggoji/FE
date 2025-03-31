import StudyNavLink from '@components/pages/study/detail/StudyNavLink';
import FloatNavButton from '@pages/study/detail/FloatNavButton';
import { Outlet } from 'react-router';

const pages = [
  {
    route: 'home',
    title: '스터디 홈',
  },
  {
    route: 'notice',
    title: '공지사항',
  },
  {
    route: 'debate',
    title: '토론 나눠요',
  },
  {
    route: 'phrases',
    title: '구절 공유해요',
  },
  {
    route: 'manage',
    title: '스터디원 관리',
  },
];

const StudyDetailLayout = () => {
  return (
    <div className="flex lg:-mx-10 min-h-[calc(100vh-74px)]">
      <>
        <nav className="w-[220px] bg-primary-100 shrink-0 hidden lg:block">
          {pages.map((page, index) => (
            <StudyNavLink key={index} to={page.route}>
              {page.title}
            </StudyNavLink>
          ))}
        </nav>
        <main className="grow relative">
          <FloatNavButton pages={pages} />
          <Outlet />
        </main>
      </>
    </div>
  );
};

export default StudyDetailLayout;
