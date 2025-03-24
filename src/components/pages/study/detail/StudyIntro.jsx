import PropTypes from 'prop-types';

const StudyIntro = ({ introData }) => {
  return (
    <div className="lg:px-24 md:py-12 py-6 border-b-1 border-slate-200">
      <h2 className="lg:text-3xl text-2xl mb-4 text-center">스터디 소개</h2>
      <p className="text-gray-500 text-center text-xl">{introData}</p>
    </div>
  );
};

StudyIntro.propTypes = {
  introData: PropTypes.string.isRequired,
};

export default StudyIntro;
