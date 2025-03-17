import PropTypes from 'prop-types';

const Pagination = ({ currentPage, setCurrentPage }) => {
  // 이전 버튼
  const handleMovePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // 다음 버튼
  const handleMoveNext = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="flex justify-center items-center gap-2 h-[64px] *:cursor-pointer">
      <div
        className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500"
        onClick={handleMovePrevious}
      >
        이전
      </div>
      {[1, 2, 3].map((page, index) => (
        <div
          key={index}
          className={`px-4 py-1  border-slate-500 rounded-xl ${page === currentPage ? 'bg-primary-300 text-white' : 'border-1 border-slate-500 bg-white text-slate-500'} `}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      ))}
      <div
        className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500"
        onClick={handleMoveNext}
      >
        다음
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
