import PropTypes from 'prop-types';

const buttonSizes = {
  large: 'h-12 px-9 text-lg',
  medium: 'h-9 px-6 text-base',
  small: 'h-6 px-5 text-sm',
};

const buttonTypes = {
  'CTA Abled': 'bg-primary-300 text-white',
  'CTA Active': 'bg-primary-400 text-white',
  'CTA Delete': 'bg-secondary-300 text-white',
  'CTA Delete Active': 'bg-secondary-400 text-white',
  'CTA Disabled': 'bg-gray-300 text-white cursor-not-allowed opacity-60',
  'CTA Lined':
    'bg-white text-gray-400 border border-gray-400 hover:bg-gray-100',
};

const Button = ({
  size = 'medium',
  type = 'CTA Abled',
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg transition duration-200 ${buttonSizes[size]} ${buttonTypes[type]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  type: PropTypes.oneOf([
    'CTA Abled',
    'CTA Active',
    'CTA Delete',
    'CTA Delete Active',
    'CTA Disabled',
    'CTA Lined',
  ]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
