import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyLeader from '@components/pages/study/detail/StudyLeader';
import StudyRules from '@components/pages/study/detail/StudyRules';
import supabase from '@libs/supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const book = {
  title: '신의 아이들은 모두 춤춘다',
  author: '무라카미 하루키',
  thumbnail:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6771279%3Ftimestamp%3D20250108153124',
  url: 'https://search.daum.net/search?w=bookpage&bookId=6771279&q=%EC%8B%A0%EC%9D%98+%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%80+%EB%AA%A8%EB%91%90+%EC%B6%A4%EC%B6%98%EB%8B%A4',
};
// 필요 데이터

const StudyDetailHome = () => {
  const [studyData, setStudyData] = useState({});
  const [leader, setLeader] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { studyId } = useParams();
  useEffect(() => {
    // studies에서 studies의 컬럼과,
    // study_id를 가지고 있는 study_participants의 row와,
    // study_id를 가지고 있는 books의 row를 가져온다
    // study_participants 결과 row에서 userId와 일치하는 users row도 덤으로 가져와줌 (외부 키연결 시 자동)
    // 결과가 하나만 있어야 함 (single)
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('studies')
        .select(
          `*,study_participants(*,users(id, nickname, img_url, intro)),books(*)`,
        )
        .eq('id', studyId)
        .single();

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

  console.log('render');
  console.log(studyData, leader);
  return (
    <div className="relative">
      {!isLoading && (
        <div className="flex flex-col">
          <StudyLeader
            leaderData={leader.users}
            className="lg:order-0 order-1"
          />
          <div className="lg:px-24 flex md:py-12 py-6 border-b-1 border-slate-200 md:flex-row flex-col">
            <StudyInfo infoData={studyData} />
            <StudyBook bookInfo={book} />
          </div>
          <StudyIntro />
          <StudyRules />
        </div>
      )}
    </div>
  );
};

export default StudyDetailHome;
