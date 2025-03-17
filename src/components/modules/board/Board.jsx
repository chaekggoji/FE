import Button from '@components/common/Button';
import BoardSort from '@components/modules/board/BoardSort';
import Pagination from '@components/modules/board/Pagination';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BoardTitle from '@components/modules/board/BoardTitle';
import BoardListItem from '@components/modules/board/BoardListItem';

const title = {
  notices: '공지사항',
  debates: '토론 나눠요',
};

const postList = [
  {
    id: 1,
    title: '첫번째 게시글',
    content: '첫번째 게시글의 내용입니다.',
  },
  {
    id: 2,
    title: '두번째 게시글',
    content: '두번째 게시글의 내용입니다.',
  },
];

const Board = () => {
  const { studyId, boardType } = useParams();
  const navigate = useNavigate();

  // 게시판 정렬 옵션
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <BoardTitle title={title[boardType]} />
      <div className="flex flex-col">
        <div className="flex items-center px-6 h-12">
          <BoardSort
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <Button
            className="ml-auto"
            onClick={() => navigate(`/study/${studyId}/${boardType}/write`)}
          >
            글 작성
          </Button>
        </div>

        <div className="font-gowunbatang min-h-[calc(100vh-264px)]">
          <div className="border-[#835F45] border-b-1 border-t-1  text-[#835F45]">
            <div className=" px-6 h-12 flex items-center">
              <div className="flex-8 text-center">제목</div>
              <div className="flex-1 text-center">참여자</div>
              <div className="flex-1 text-center">댓글</div>
              <div className="flex-1 text-center">조회수</div>
              <div className="flex-1 text-center">최근 활동</div>
            </div>
          </div>

          {postList.map((post) => (
            <BoardListItem key={post.id} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Board;
