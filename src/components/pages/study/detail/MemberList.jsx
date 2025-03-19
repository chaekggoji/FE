import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';

const MemberList = ({ memberList }) => {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer">
      {memberList.map((member) => {
        return (
          <img
            src={profileDefaultIcon}
            key={member.id}
            className={`relative group lg:size-12 size-10 -mr-2`}
            title={member.nickname ? member.nickname : '탈퇴한 사용자'}
            onClick={() => navigate(`/profile/${member.id}`)}
          />
        );
      })}
    </div>
  );
};

MemberList.propTypes = {
  memberList: PropTypes.array.isRequired,
};

export default MemberList;
