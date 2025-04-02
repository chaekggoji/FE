import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const ITEM_PER_PAGE = 3; // 페이지 별 게시글 개수
const VISIBLE_PAGE_NUMBERS = 2; // 한 번에 볼수 있는 페이지 버튼 개수

const Pagination = ({ currentPage, setCurrentPage, totalCount }) => {
  const navigate = useNavigate();
  const [pageGroups, setPageGroups] = useState([]);
  const totalPages = Math.ceil(totalCount / ITEM_PER_PAGE);
  const currentGroupIndex = Math.floor(
    (currentPage - 1) / VISIBLE_PAGE_NUMBERS,
  );

  useEffect(() => {
    const newPageGroups = [];
    // i : 각 그룹의 첫 원소 지정
    // j : 0부터 시작해 i에 더해지며 group에 push 됨.
    // j는 버튼 개수보다 작아야 하며, i + j는 totalPages보다 작거나 같아야 함.
    for (let i = 1; i <= totalPages; i += VISIBLE_PAGE_NUMBERS) {
      const group = [];
      for (let j = 0; j < VISIBLE_PAGE_NUMBERS && i + j <= totalPages; j++) {
        group.push(i + j);
      }
      newPageGroups.push(group);
    }
    setPageGroups(newPageGroups);
  }, []);

  // 이전 버튼
  const handleMovePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      handleChangePage(newPage);
    }
  };

  // 다음 버튼
  const handleMoveNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      handleChangePage(newPage);
    }
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`); // URL의 page 파라미터를 업데이트
  };

  return (
    <div className="flex justify-center items-center gap-2 h-[64px] *:cursor-pointer">
      <div
        className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500"
        onClick={handleMovePrevious}
      >
        이전
      </div>
      {pageGroups?.[currentGroupIndex]?.map((item, index) => {
        return (
          <div
            key={index}
            className={`px-4 py-1  border-slate-500 rounded-xl ${item === currentPage ? 'bg-primary-300 text-white' : 'border-1 border-slate-500 bg-white text-slate-500'} `}
            onClick={() => handleChangePage(item)}
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
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Pagination;
