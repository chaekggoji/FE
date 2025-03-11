import PropTypes from 'prop-types';

const CustomInputField = ({
  labelText,
  labelSize,
  id,
  type = 'text',
  min,
  max,
  placeholder,
  children,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-1 text-gray-400 ${labelSize ? `text-${labelSize}` : 'sm:text-2xl'}`}
      >
        {labelText || null}
      </label>
      <div className="flex w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl has-focus-within:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          className="w-full placeholder-gray-300 focus:outline-hidden"
        />
        {children}
      </div>
    </div>
  );
};

CustomInputField.propTypes = {
  labelText: PropTypes.string,
  labelSize: PropTypes.string,
  id: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

export default CustomInputField;
