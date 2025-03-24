import Button from '@components/common/Button';
import StudyMembers from '@components/pages/study/detail/StudyMembers';
import { useLocation, useParams } from 'react-router';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';
import supabase from '@libs/supabase';

const loggedInUserId = 3;

const StudyInfo = ({ studyData }) => {
  const { studyId } = useParams();
  // 반응형 버튼 제작을 위한 커스텀 훅 사용
  const md = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();

  const isParticipant = studyData.study_participants
    .map((participant) => participant.users.id)
    .includes(loggedInUserId);

  const participateUser = async (userId) => {
    const { error } = await supabase
      .from('study_participants')
      .insert([{ user_id: userId, study_id: studyId, role: 'member' }]);

    if (error) {
      window.alert('스터디 참여 중 오류가 발생했습니다.');
      return;
    }
    window.alert('스터디에 참여하였습니다.');
  };

  const handleParticipate = async (userId) => {
    try {
      await participateUser(userId);
    } catch (error) {
      console.log(error);
    }
  };
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
          {!isParticipant && (
            <div className="ml-auto">
              <Button
                size={md ? 'medium' : 'small'}
                onClick={() => handleParticipate(loggedInUserId)}
              >
                스터디 참여하기
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

StudyInfo.propTypes = {
  studyData: PropTypes.object,
};

export default StudyInfo;
