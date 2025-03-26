import PropTypes from 'prop-types';

const InputError = ({ target }) => {
  if (!target) return;
  return <p className="text-point-red mt-[2px]">{target?.message}</p>;
};

InputError.propTypes = {
  target: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default InputError;
