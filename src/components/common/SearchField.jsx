import Button from '@components/common/Button';
import PropTypes from 'prop-types';

const SearchField = ({
  type = 'text',
  placeholder,
  labelText,
  labelSize,
  searchKeyword,
  onClick,
  onKeyDown,
}) => {
  return (
    <>
      {labelText && (
        <label className={`mb-1 text-gray-400 text-${labelSize}`}>
          {labelText}
        </label>
      )}
      <div
        className={`flex gap-x-6 justify-between w-full pl-6 pr-2 py-2 border border-gray-200 rounded-xl sm:text-xl has-focus-within:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300`}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="w-full placeholder-gray-300 focus:outline-hidden"
          ref={searchKeyword}
          onKeyDown={onKeyDown}
        />
        <Button size="medium" type="CTA Abled" onClick={onClick}>
          <img
            src="/src/assets/icons/icon_search_24.svg"
            className="absolute left-[50%] top-[50%] -translate-[50%]"
          />
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
  searchKeyword: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

export default SearchField;
