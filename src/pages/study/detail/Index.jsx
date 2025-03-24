import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyLeader from '@components/pages/study/detail/StudyLeader';
import StudyRules from '@components/pages/study/detail/StudyRules';
import { getStudyById } from '@queries/getStudyById';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// 필요 데이터

const StudyDetailHome = () => {
  const [studyData, setStudyData] = useState({});
  const [leader, setLeader] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { studyId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getStudyById(studyId);

      if (error) {
        console.log('Study fetch error:', error);
        return;
      }

      if (data) {
        setStudyData(data);

        const leader = data.study_participants.find(
          (participant) => participant.role === 'leader',
        );

        setLeader(leader);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studyId]);

  return (
    <div className="relative">
      {!isLoading && (
        <div className="flex flex-col">
          <StudyLeader
            leaderData={leader.users}
            className="lg:order-0 order-1"
          />
          <div className="lg:px-24 flex md:py-12 py-6 border-b-1 border-slate-200 md:flex-row flex-col">
            <StudyInfo studyData={studyData} />
            <StudyBook bookData={studyData.books} />
          </div>
          <StudyIntro introData={studyData.description} />
          <StudyRules ruleData={studyData.rule} />
        </div>
      )}
    </div>
  );
};

export default StudyDetailHome;
