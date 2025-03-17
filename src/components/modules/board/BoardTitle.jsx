import PropTypes from 'prop-types';

const BoardTitle = ({ title }) => {
  return (
    <div className="px-24 w-full flex items-center justify-center min-h-[78px] border-b-1 border-slate-200">
      <h1 className="text-3xl text-center">{title}</h1>
    </div>
  );
};

BoardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BoardTitle;
