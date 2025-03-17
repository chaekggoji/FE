import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyRules from '@components/pages/study/detail/StudyRules';

const StudyPreview = () => {
  const book = {
    title: '신의 아이들은 모두 춤춘다',
    author: '무라카미 하루키',
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6771279%3Ftimestamp%3D20250108153124',
    url: 'https://search.daum.net/search?w=bookpage&bookId=6771279&q=%EC%8B%A0%EC%9D%98+%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%80+%EB%AA%A8%EB%91%90+%EC%B6%A4%EC%B6%98%EB%8B%A4',
  };

  return (
    <>
      <h1 className="text-4xl">스터디 미리보기</h1>
      <div className="flex flex-col gap-y-6 sm:gap-y-10 sm:border border-gray-200 sm:p-10 rounded-xl">
        <div className="px-24 flex py-12 border-b-1 border-slate-200">
          <StudyInfo />
          <StudyBook bookInfo={book} />
        </div>
        <StudyIntro />
        <StudyRules />
      </div>
    </>
  );
};

export default StudyPreview;
