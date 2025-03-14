import StudyNavLink from '@components/pages/study/detail/StudyNavLink';
import { Outlet } from 'react-router-dom';

const StudyDetailLayout = () => {
  return (
    <div className="flex lg:-mx-10 min-h-[calc(100vh-74px)]">
      <nav className="w-[220px] bg-primary-100 shrink-0">
        <StudyNavLink to="home">스터디 홈</StudyNavLink>
        <StudyNavLink to="notices">공지사항</StudyNavLink>
        <StudyNavLink to="debates">토론 나눠요</StudyNavLink>
        <StudyNavLink to="phrases">구절 공유해요</StudyNavLink>
        <StudyNavLink to="manage">스터디원 관리</StudyNavLink>
      </nav>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default StudyDetailLayout;
