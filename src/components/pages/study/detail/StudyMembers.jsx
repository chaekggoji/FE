import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';

const StudyMembers = ({ memberData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer">
      {memberData.map((member) => {
        return (
          <img
            src={
              member.users.img_url ? member.users.img_url : profileDefaultIcon
            }
            key={member.users.id}
            className={`relative group lg:size-12 size-10 -mr-2 rounded-full object-cover`}
            title={
              member.users.nickname ? member.users.nickname : '탈퇴한 사용자'
            }
            onClick={() => navigate(`/profile/${member.users.id}`)}
          />
        );
      })}
    </div>
  );
};

StudyMembers.propTypes = {
  memberData: PropTypes.array.isRequired,
};

export default StudyMembers;
