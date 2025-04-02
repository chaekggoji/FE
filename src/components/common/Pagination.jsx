import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const Pagination = ({ page, setPage }) => {
  const navigate = useNavigate();
  // 이전 버튼
  const handleMovePrevious = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      navigate(`?page=${newPage}`); // URL의 page 파라미터를 업데이트
    }
  };

  // 다음 버튼
  const handleMoveNext = () => {
    if (page < 3) {
      const newPage = page + 1;
      setPage(newPage);
      navigate(`?page=${newPage}`);
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
      {[1, 2, 3].map((item, index) => {
        console.log(item, page);
        return (
          <div
            key={index}
            className={`px-4 py-1  border-slate-500 rounded-xl ${item === page ? 'bg-primary-300 text-white' : 'border-1 border-slate-500 bg-white text-slate-500'} `}
            onClick={() => setPage(page)}
          >
            {item}
          </div>
        );
      })}
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
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
