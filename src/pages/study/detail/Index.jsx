import StudyBook from '@pages/study/detail/components/StudyBook';
import StudyInfo from '@pages/study/detail/components/StudyInfo';
import StudyIntro from '@pages/study/detail/components/StudyIntro';
import StudyLeader from '@pages/study/detail/components/StudyLeader';
import StudyRules from '@pages/study/detail/components/StudyRules';

const leader = {
  id: 1,
  img_url: null,
  nickname: '나리더',
  intro: '안녕하세요 스터디 리더 나리더입니다.',
};

const StudyDetailHome = () => {
  return (
    <>
      <StudyLeader
        userId={leader.id}
        profileURL={leader.img_url}
        nickname={leader.nickname}
        intro={leader.intro}
      />
      <div className="px-24 flex py-12 border-b-1 border-slate-200">
        <StudyInfo />
        <StudyBook />
      </div>
      <StudyIntro />
      <StudyRules />
    </>
  );
};

export default StudyDetailHome;
