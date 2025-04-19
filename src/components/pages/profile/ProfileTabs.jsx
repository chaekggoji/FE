import PropTypes from 'prop-types';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-2.5 w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto pl-5 text-center">
      <button
        className={`w-24 py-0.5 rounded-t-lg border-t-4 box-border text-xl cursor-pointer ${
          activeTab === 'studies'
            ? 'bg-white border-gray-100'
            : 'bg-gray-100 border-gray-200 text-gray-500'
        }`}
        onClick={() => setActiveTab('studies')}
      >
        스터디
      </button>
      <button
        className={`w-24 py-0.5 rounded-t-lg border-t-4 box-border text-xl cursor-pointer ${
          activeTab === 'books'
            ? 'bg-white border-gray-100'
            : 'bg-gray-100 border-gray-200 text-gray-500'
        }`}
        onClick={() => setActiveTab('books')}
      >
        도서
      </button>
    </div>
  );
};

ProfileTabs.propTypes = {
  activeTab: PropTypes.oneOf(['studies', 'books']).isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default ProfileTabs;
