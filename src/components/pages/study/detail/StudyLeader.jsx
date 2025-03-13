import defaultProfile from '@assets/icons/icon_no_profile_24.svg';
import Button from '@components/common/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const StudyLeader = ({ userId, profileURL, nickname, intro }) => {
  const navigate = useNavigate();
  return (
    <div className="px-24 w-full flex items-center min-h-[104px] border-b-1 border-slate-200">
      <img
        className="size-20 mr-5"
        src={profileURL ? profileURL : defaultProfile}
      />
      <div>
        <h4 className="text-xl">스터디 리더 : {nickname}</h4>
        <p>{intro}</p>
      </div>
      <div className="ml-auto">
        <Button onClick={() => navigate(`/profile/${userId}`)}>
          프로필 보기
        </Button>
      </div>
    </div>
  );
};

export default StudyLeader;

StudyLeader.propTypes = {
  userId: PropTypes.number.isRequired,
  profileURL: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};
