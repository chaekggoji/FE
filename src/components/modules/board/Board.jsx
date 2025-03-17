import Button from '@components/common/Button';
import BoardSort from '@components/modules/board/BoardSort';
import BoardList from '@components/modules/board/BoardList';
import Pagination from '@components/modules/board/Pagination';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Board = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-6 h-12">
        <BoardSort
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <Button
          className="ml-auto"
          onClick={() => navigate(`/study/${studyId}/notices/write`)}
        >
          글 작성
        </Button>
      </div>
      <BoardList />
      <Pagination />
    </div>
  );
};

export default Board;
