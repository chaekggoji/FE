import Button from '@components/common/Button';
import PropTypes from 'prop-types';

const SearchField = ({ type = 'text', placeholder, labelText, labelSize }) => {
  return (
    <>
      <label className={`mb-1 text-gray-400 text-${labelSize}`}>
        {labelText || null}
      </label>
      <div
        className={`flex gap-x-6 justify-between w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl has-focus-within:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300`}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="w-full placeholder-gray-300 focus:outline-hidden"
        />
        <Button size="large" type="CTA Abled">
          검색
        </Button>
      </div>
    </>
  );
};

SearchField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
  labelText: PropTypes.string,
  labelSize: PropTypes.string,
};

export default SearchField;
