import PropTypes from 'prop-types';

const ProfileCategoryTag = ({ text }) => {
  return (
    <span className="px-3 box-border border-2 rounded-2xl border-primary-400">
      # {text}
    </span>
  );
};

ProfileCategoryTag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ProfileCategoryTag;
