import StudyNavLink from '@components/pages/study/detail/StudyNavLink';
import FloatNavButton from '@pages/study/detail/FloatNavButton';
import { getStudyMemberList } from '@queries/study';
import useUserStore from '@store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router';

const defaultPages = [
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
];

const StudyDetailLayout = () => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const { studyId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['members', studyId],
    queryFn: () => getStudyMemberList(studyId),
    select: (res) => res.data,
  });

  // member, leader 또는 anon(undefined)
  const role = data?.find((member) => member.users.id === loggedInUserId)?.role;
  console.log(role);

  const visiblePages = (() => {
    if (role === 'leader') {
      return [...defaultPages, { route: 'manage', title: '스터디원 관리' }];
    }
    if (role === 'member') {
      return defaultPages;
    } else {
      return [{ route: 'home', title: '스터디 홈' }];
    }
  })();

  return (
    <div className="flex lg:-mx-10 min-h-[calc(100vh-74px)]">
      <>
        <nav className="w-[220px] bg-primary-100 shrink-0 hidden lg:block">
          {visiblePages.map((page, index) => (
            <StudyNavLink key={index} to={page.route}>
              {page.title}
            </StudyNavLink>
          ))}
        </nav>
        <main className="grow relative">
          <FloatNavButton pages={visiblePages} />
          {!isLoading && <Outlet context={{ memberList: data }} />}
        </main>
      </>
    </div>
  );
};

export default StudyDetailLayout;
