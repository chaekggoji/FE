import BookItem from '@components/common/BookItem';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';

const StudyPreview = ({ studyForm, isBookSelected }) => {
  const md = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <h1 className="text-4xl">스터디 미리보기</h1>
      <div className="flex flex-col sm:border border-gray-200 sm:p-10 rounded-xl">
        <div className="lg:px-24 flex md:py-12 py-6 border-b-1 border-slate-200 md:flex-row flex-col">
          <div className="flex-3/5 flex flex-col gap-4 md:border-none border-b-1 border-slate-200 md:pb-0 pb-6 pr-4">
            <h2 className="lg:text-3xl text-2xl mb-4 text-center">
              스터디 정보
            </h2>
            <h3 className="lg:text-3xl text-2xl">{studyForm?.title}</h3>
            <div className="flex">
              <div className="flex-1/3 flex flex-col gap-4 lg:text-2xl text-xl">
                <p>스터디 진행 도서</p>
                <p>스터디 일정</p>
                <p>모집 인원</p>
              </div>
              <div className="flex-2/3 flex flex-col gap-4 lg:text-2xl text-xl">
                <p>{isBookSelected?.title}</p>
                <p>
                  {studyForm?.start_date} ~ {studyForm?.end_date}
                </p>
                <p>{studyForm?.capacity}</p>
              </div>
            </div>
          </div>
          {/* <StudyInfo /> */}
          <div className="flex-2/5 flex flex-col items-center md:pt-0 pt-6">
            <h2 className="lg:text-3xl text-2xl mb-5 text-center">도서 정보</h2>
            <BookItem
              size={md ? 'large' : 'medium'}
              title={isBookSelected.title}
              author={isBookSelected.author.join(', ')}
              thumbnail={isBookSelected.thumb_url}
              link={isBookSelected.url}
            />
          </div>
          {/* <StudyBook bookInfo={book} /> */}
        </div>
        <div className="lg:px-24 md:py-12 py-6 border-b-1 border-slate-200">
          <h2 className="lg:text-3xl text-2xl mb-4 text-center">스터디 소개</h2>
          <p className="text-gray-500 text-center text-xl">
            {studyForm?.description}
          </p>
        </div>
        {/* <StudyIntro /> */}
        <div className="lg:px-24 md:pt-12 pt-6">
          <h2 className="lg:text-3xl text-2xl mb-4 text-center">스터디 규칙</h2>
          <p className="text-xl text-center text-gray-500">{studyForm?.rule}</p>
        </div>
        {/* <StudyRules /> */}
      </div>
    </>
  );
};

StudyPreview.propTypes = {
  studyForm: PropTypes.object,
  isBookSelected: PropTypes.object,
};

export default StudyPreview;
