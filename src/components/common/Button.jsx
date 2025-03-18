import PropTypes from 'prop-types';

const Button = ({
  size = 'medium',
  type = 'CTA Abled',
  children,
  onClick,
  ...props
}) => {
  const sizeClass = {
    large: 'h-12 px-9 text-lg',
    medium: 'h-9 px-6 text-base',
    small: 'h-6 px-5 text-sm',
  }[size];

  const typeClass = {
    'CTA Abled': 'bg-primary-300 text-white cursor-pointer',
    'CTA Active': 'bg-primary-400 text-white cursor-pointer',
    'CTA Delete': 'bg-secondary-300 text-white cursor-pointer',
    'CTA Delete Active': 'bg-secondary-400 text-white cursor-pointer',
    'CTA Disabled': 'bg-gray-300 text-white cursor-not-allowed opacity-60',
    'CTA Lined':
      'bg-white text-gray-400 border border-gray-400 hover:bg-gray-100 cursor-pointer',
  }[type];

  return (
    <button
      className={`inline-flex items-center justify-center font-normal transition duration-200 rounded-lg gap-x-2.5 shrink-0 relative ${sizeClass} ${typeClass}`}
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
