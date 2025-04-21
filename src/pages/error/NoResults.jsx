import ErrorImage from '@assets/images/DataError.png';
import PropTypes from 'prop-types';

const NoResults = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-74px-78px)] gap-4">
      <img src={ErrorImage} className="size-30" />
      <p className="text-xl">{message}</p>
    </div>
  );
};

NoResults.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoResults;
