import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyLeader from '@components/pages/study/detail/StudyLeader';
import StudyRules from '@components/pages/study/detail/StudyRules';
import { getStudyById } from '@queries/study';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';

const StudyDetailHome = () => {
  const { studyId } = useParams();
  const { memberList } = useOutletContext();
  const leader = memberList.find((member) => member.role === 'leader');
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['study', studyId],
    queryFn: () => {
      return getStudyById(studyId);
    },

    select: (res) => ({
      studies: res.data,
      error: res.error,
    }),

    staleTime: 1000 * 10, // 10초 동안 refetch 안 함
  });

  // 에러 처리
  useEffect(() => {
    if (data?.error) {
      if (data.error.code === 'PGRST116') navigate('/406', { replace: true });
    }
  }, [data]);

  return (
    <div className="relative">
      {!isLoading && (
        <div className="flex flex-col">
          <StudyLeader
            leaderData={leader?.users}
            className="lg:order-0 order-1"
          />
          <div className="lg:px-24 flex md:py-12 py-6 border-b-1 border-slate-200 md:flex-row flex-col">
            <StudyInfo studyData={data.studies} memberData={memberList} />
            <StudyBook bookData={data.studies?.books} />
          </div>
          <StudyIntro introData={data.studies?.description} />
          <StudyRules ruleData={data.studies?.rule} />
        </div>
      )}
    </div>
  );
};

export default StudyDetailHome;
