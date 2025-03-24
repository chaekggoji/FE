import Button from '@components/common/Button';
import StudyMembers from '@components/pages/study/detail/StudyMembers';
import { useLocation } from 'react-router';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';

const StudyInfo = ({ studyData }) => {
  // 반응형 버튼 제작을 위한 커스텀 훅 사용
  const md = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  console.log(studyData);

  return (
    <div className="flex-3/5 flex flex-col gap-4 md:border-none border-b-1 border-slate-200 md:pb-0 pb-6">
      <h2 className="lg:text-3xl text-2xl mb-4 text-center">스터디 정보</h2>
      <h3 className="lg:text-3xl text-2xl">{studyData.title}</h3>
      <div className="flex">
        <div className="flex-1/3 flex flex-col gap-4 lg:text-2xl text-xl">
          <p>스터디 진행 도서</p>
          <p>스터디 일정</p>
          <p>모집 인원</p>
        </div>
        <div className="flex-2/3 flex flex-col gap-4 lg:text-2xl text-xl">
          <p>{studyData.books.title}</p>
          <p>
            {studyData.start_date} ~ {studyData.end_date}
          </p>
          <p>{studyData.capacity}</p>
        </div>
      </div>
      {pathname !== '/study/create' && (
        // 현재 위치가 /study/create 가 아닌 경우에만 렌더링
        <>
          <div>
            <p className="text-2xl mb-4">현재 스터디원</p>
            <StudyMembers participantData={studyData.study_participants} />
          </div>
          <div className="ml-auto">
            <Button
              size={md ? 'medium' : 'small'}
              onClick={() => window.alert('스터디에 참여하였습니다.')}
            >
              스터디 참여하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

StudyInfo.propTypes = {
  studyData: PropTypes.object,
};

export default StudyInfo;
