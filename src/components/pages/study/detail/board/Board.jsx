import Button from '@components/common/Button';
import BoardSort from '@components/pages/study/detail/board/BoardSort';
import BoardList from '@components/pages/study/detail/board/BoardList';
import Pagination from '@components/pages/study/detail/board/Pagination';
import { useState } from 'react';

const Board = () => {
  const [sortBy, setSortBy] = useState('');
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-6 h-12">
        <BoardSort setSortBy={setSortBy} />
        <Button className="ml-auto">글 작성</Button>
      </div>
      <BoardList />
      <Pagination />
    </div>
  );
};

export default Board;
