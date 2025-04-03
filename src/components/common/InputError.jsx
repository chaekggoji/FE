import PropTypes from 'prop-types';

const InputError = ({ target }) => {
  if (!target) return;
  return <p className="text-secondary-300 text-sm mt-2">{target?.message}</p>;
};

InputError.propTypes = {
  target: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default InputError;
