import PropTypes from 'prop-types';

const BoardSort = ({ setSortBy }) => {
  const handleSelect = (event) => {
    setSortBy(event.target.value);
  };
  return (
    <select onChange={handleSelect}>
      <option className="w-8" value="">
        게시글 정렬
      </option>
      <option value="mostViewed">조회수 많은 순</option>
      <option value="mostCommented">댓글 많은 순</option>
      <option value="recent">최근 활동 순</option>
    </select>
  );
};

BoardSort.propTypes = {
  setSortBy: PropTypes.func.isRequired,
};

export default BoardSort;
