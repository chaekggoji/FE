import Button from '@components/common/Button';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getJoinedStudies } from '@queries/profile/getJoinedStudies';
import StudyCard from '@components/pages/profile/StudyCard';
import WhiteSpinner from '@components/common/WhiteSpinner';

const ProfileStudySection = ({ userId }) => {
  // React Query로 사용자의 스터디 목록 가져오기
  const {
    data: studies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userStudies', userId],
    queryFn: () => getJoinedStudies(userId),
    enabled: !!userId,
  });

  // 로딩 중 표시
  if (isLoading) {
    return <WhiteSpinner />;
  }

  // 에러 발생 시 표시
  if (error) {
    return (
      <div className="text-center text-red-500">
        스터디 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  // 표시할 스터디 제한 (최대 4개)
  const displayStudies = studies?.slice(0, 4) || [];

  return (
    <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto py-5 px-10 bg-white rounded-xl flex flex-col gap-5">
      <h2 className="text-3xl text-center py-5">최근 스터디</h2>

      {displayStudies.length > 0 ? (
        // 스터디 카드 표시 (grid 레이아웃 유지)
        <div className="grid lg:grid-cols-2 gap-5">
          {displayStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      ) : (
        // 스터디가 없을 때 메시지 표시
        <div className="text-center text-gray-500 py-10">
          참여 중인 스터디가 없습니다.
        </div>
      )}

      <div className="self-end py-5">
        <Link to={`/profile/${userId}/studies`}>
          <Button>모두 보기</Button>
        </Link>
      </div>
    </div>
  );
};

ProfileStudySection.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileStudySection;
