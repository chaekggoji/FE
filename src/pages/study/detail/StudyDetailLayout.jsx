import StudyNavLink from '@components/pages/study/detail/StudyNavLink';
import FloatNavButton from '@pages/study/detail/FloatNavButton';
import { useState } from 'react';
import { Outlet } from 'react-router';
import errorImg from '@assets/images/error.png';

const pages = [
  {
    route: 'home',
    title: '스터디 홈',
  },
  {
    route: 'notices',
    title: '공지사항',
  },
  {
    route: 'debates',
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
  const [isError, setIsError] = useState();
  return (
    <div className="flex lg:-mx-10 min-h-[calc(100vh-74px)]">
      {isError && (
        <div className="flex justify-center items-center flex-col gap-8 w-full">
          <img src={errorImg} width="160px" />
          <p className="text-2xl">존재하지 않는 페이지입니다.</p>
        </div>
      )}
      {!isError && (
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
            <Outlet context={{ setIsError }} />
          </main>
        </>
      )}
    </div>
  );
};

export default StudyDetailLayout;
