import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import BoardTitle from '@components/modules/board/BoardTitle';
import BoardListItem from '@components/modules/board/BoardListItem';
import DropdownBox from '@components/common/DropdownBox';
import useMediaQuery from '@hooks/useMediaQuery';
import { useQuery } from '@tanstack/react-query';
import { getPostListByType } from '@queries/posts';
import usePagination from '@hooks/usePagination';

// 리팩토링 목록
// - 정렬
// - 페이지네이션 ✅

const title = {
  notice: '공지사항',
  debate: '토론 나눠요',
};

const options = [
  { name: '조회수 많은 순', value: 'mostViewed' },
  { name: '댓글 많은 순', value: 'mostCommented' },
  { name: '최근 활동 순', value: 'recent' },
  { name: '초기화', value: null },
];

const Board = () => {
  const { studyId, boardType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const md = useMediaQuery('(min-width: 768px)');

  // 게시판 정렬 옵션
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });

  // 페이지네이션 관련 로직
  const getPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return page;
  };
  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  useEffect(() => {
    setCurrentPage(getPageFromURL());
  }, [boardType]);

  const ITEMS_PER_PAGE = 3;
  const PAGES_PER_GROUP = 3;
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data, isLoading } = useQuery({
    queryKey: ['posts', boardType, currentPage],
    queryFn: () => {
      return getPostListByType(studyId, boardType, from, to);
    },
    select: (res) => ({
      posts: res.data,
      totalCount: res.count,
    }),
    staleTime: 1000 * 10,
  });

  const pagination = usePagination(
    currentPage,
    data?.totalCount || 0,
    ITEMS_PER_PAGE,
    PAGES_PER_GROUP,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`); // URL의 page 파라미터를 업데이트
  };

  return (
    <div className="lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />
      <div className="flex flex-col">
        {!isLoading && (
          <>
            <div className="flex items-center px-6 h-12">
              <DropdownBox
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={options}
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
              {data?.posts.map((item) => (
                <BoardListItem key={item.id} postData={item} />
              ))}
            </div>
            <div className="h-[64px] flex items-center justify-center">
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                currentGroup={pagination.currentGroup}
                hasPrev={pagination.hasPrev}
                hasNext={pagination.hasNext}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
