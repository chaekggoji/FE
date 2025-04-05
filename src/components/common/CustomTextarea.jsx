import InputError from '@components/common/InputError';
import PropTypes from 'prop-types';

const CustomTextarea = ({
  labelText,
  labelSize,
  id,
  type = 'text',
  min,
  max,
  placeholder,
  children,
  register,
  error,
}) => {
  return (
    <div>
      {labelText && (
        <label
          htmlFor={id}
          className={`mb-1 text-gray-400 ${labelSize ? `text-${labelSize}` : 'sm:text-2xl'}`}
        >
          {labelText}
        </label>
      )}
      <div className="flex w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl has-focus-within:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300">
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          className="w-full placeholder-gray-300 focus:outline-hidden resize-none"
          rows="6"
          {...register}
        />
        {children}
      </div>
      <InputError target={error} />
    </div>
  );
};

CustomTextarea.propTypes = {
  labelText: PropTypes.string,
  labelSize: PropTypes.string,
  id: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  register: PropTypes.object,
  error: PropTypes.object,
};

export default CustomTextarea;
