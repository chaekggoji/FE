import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';

const StudyMembers = ({ participantData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer">
      {participantData.map((participant) => {
        return (
          <img
            src={profileDefaultIcon}
            key={participant.users.id}
            className={`relative group lg:size-12 size-10 -mr-2`}
            title={
              participant.users.nickname
                ? participant.users.nickname
                : '탈퇴한 사용자'
            }
            onClick={() => navigate(`/profile/${participant.users.id}`)}
          />
        );
      })}
    </div>
  );
};

StudyMembers.propTypes = {
  participantData: PropTypes.array.isRequired,
};

export default StudyMembers;
