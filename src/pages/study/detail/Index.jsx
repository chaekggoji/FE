import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyLeader from '@components/pages/study/detail/StudyLeader';
import StudyRules from '@components/pages/study/detail/StudyRules';
import { getStudyById } from '@queries/study/getStudyById';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router';

const StudyDetailHome = () => {
  const { studyId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['study', studyId],
    queryFn: () => {
      return getStudyById(studyId);
    },
    select: (res) => {
      // 응답에서 leader를 꺼내 study와 함께 반환
      const study = res.data;
      const leader = study.study_participants.find(
        (participant) => participant.role === 'leader',
      );

      return { ...study, leader };
    },
    staleTime: 1000 * 10, // 10초 동안 refetch 안 함
  });

  if (isError) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="relative">
      {!isLoading && !isError && (
        <div className="flex flex-col">
          <StudyLeader
            leaderData={data.leader.users}
            className="lg:order-0 order-1"
          />
          <div className="lg:px-24 flex md:py-12 py-6 border-b-1 border-slate-200 md:flex-row flex-col">
            <StudyInfo studyData={data} />
            <StudyBook bookData={data.books} />
          </div>
          <StudyIntro introData={data.description} />
          <StudyRules ruleData={data.rule} />
        </div>
      )}
    </div>
  );
};

export default StudyDetailHome;
