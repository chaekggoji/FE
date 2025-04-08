import PropTypes, { bool } from 'prop-types';

const Pagination = ({
  currentPage,
  onPageChange,
  currentGroup = [],
  hasPrev,
  hasNext,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 h-[64px] *:cursor-pointer">
      {/* 이전 버튼 */}
      <div
        className={`px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500 ${!hasPrev && 'opacity-60 pointer-events-none'}`}
        onClick={() => hasPrev && onPageChange(currentPage - 1)}
      >
        이전
      </div>
      {/* 페이지 그룹 */}
      {currentGroup?.map((page) => {
        return (
          <div
            key={page}
            className={`px-4 py-1  border-slate-500 rounded-xl ${page === currentPage ? 'bg-primary-300 text-white' : 'border-1 border-slate-500 bg-white text-slate-500'} `}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        );
      })}
      {/* 다음 버튼 */}
      <div
        className={`px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500 ${!hasNext && 'opacity-60 pointer-events-none'}`}
        onClick={() => hasNext && onPageChange(currentPage + 1)}
      >
        다음
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentGroup: PropTypes.array.isRequired,
  hasPrev: bool.isRequired,
  hasNext: bool.isRequired,
};

export default Pagination;
