import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BoardTitle from '@components/modules/board/BoardTitle';
import BoardListItem from '@components/modules/board/BoardListItem';
import DropdownBox from '@components/common/DropdownBox';
import useMediaQuery from '@hooks/useMediaQuery';

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
  {
    id: 3,
    title: '세번째 게시글',
    content: '세번째 게시글의 내용입니다.',
  },
];

const options = [
  { name: '조회수 많은 순', value: 'mostViewed' },
  { name: '댓글 많은 순', value: 'mostCommented' },
  { name: '최근 활동 순', value: 'recent' },
  { name: '초기화', value: null },
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

  useEffect(() => {
    // boardType이 바뀔 때마다 currentPage를 1로 초기화
    setCurrentPage(1);
  }, [boardType]);

  const md = useMediaQuery('(min-width: 768px)');
  return (
    <div className="lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />
      <div className="flex flex-col">
        <div className="flex items-center px-6 h-12">
          <DropdownBox
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
            className="w-32"
            size={md ? 'medium' : 'small'}
          />
          <Button
            size={md ? 'medium' : 'small'}
            className="ml-auto"
            onClick={() => navigate(`/study/${studyId}/${boardType}/write`)}
          >
            글 작성
          </Button>
        </div>

        <div className="font-gowunbatang min-h-[calc(100vh-264px)]">
          <div className="border-[#835F45] border-b-1 border-t-1  text-[#835F45] hidden md:block">
            <div className="lg:px-6 px-4 h-12 flex items-center">
              <div className="flex-3/5 text-center">제목</div>
              <div className="flex-2/5 flex text-center">
                <div className="flex-1">참여자</div>
                <div className="flex-1">댓글</div>
                <div className="flex-1">조회수</div>
                <div className="flex-1">최근 활동</div>
              </div>
            </div>
          </div>
          <hr className="md:hidden h-px border-0 bg-slate-500" />
          {postList.map((post) => (
            <BoardListItem key={post.id} post={post} />
          ))}
        </div>
        <div className="h-[64px] flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
