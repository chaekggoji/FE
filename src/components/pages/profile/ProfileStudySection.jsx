import Button from '@components/common/Button';
import StudyCardList from '@components/pages/profile/StudyCardList';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ProfileStudySection = ({ userId }) => {
  return (
    <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto py-5 px-10 bg-white rounded-xl flex flex-col gap-5">
      <h2 className="text-3xl text-center py-5">최근 스터디</h2>
      <StudyCardList limit={4} />
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
