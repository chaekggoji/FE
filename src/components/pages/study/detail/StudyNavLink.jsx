import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const StudyNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'block h-[52px] px-[20px] py-[14px]',
          isActive ? 'bg-primary-200' : '',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
};

StudyNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default StudyNavLink;
