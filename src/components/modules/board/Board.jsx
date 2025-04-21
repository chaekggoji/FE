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
import NoResults from '@pages/error/NoResults';

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

  // 정렬 관련 로직
  // ⭐ 표시된 코드는 정렬 관련 코드입니다.

  // ⭐ url에서 sortBy 파라미터의 값을 가져오는 함수
  // sortOption state의 초기값에 사용됩니다.
  const getSortOptionFromURL = () => {
    const params = new URLSearchParams(location.search);
    const value = params.get('sortBy');
    return (
      options.find((option) => option.value === value) || {
        name: '정렬 기준',
        value: '',
      }
    );
  };

  // ⭐ DropdownBox 컴포넌트에서 옵션 선택에 따라 변경되는 상태
  // name, value 속성을 가진 객체로 관리됩니다.
  const [sortOption, setSortOption] = useState(getSortOptionFromURL());

  // ⭐ DropdownBox에서 옵션이 선택되었을 때
  // 상태를 변경하고, url에 파라미터를 넣는 함수
  const handleSortOptionChange = (sortOption) => {
    setSortOption(sortOption);
    navigate(`?sortBy=${sortOption.value}`); // URL의 page 파라미터를 업데이트
  };

  // 페이지네이션 관련 로직
  // 🚩 표시되어있는 코드를 데이터를 불러오는 컴포넌트에서 사용하시면 됩니다.

  // 🚩 url search params에서 page 값을 가져옵니다.
  const getPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return page;
  };

  // 공지사항, 토론 게시판 이동시 currentPage를 초기화합니다.
  useEffect(() => {
    setCurrentPage(getPageFromURL());
  }, [boardType]);

  // 🚩 페이지네이션 설정에 필요한 상태와 변수들입니다.
  const [currentPage, setCurrentPage] = useState(getPageFromURL());
  const ITEMS_PER_PAGE = 7;
  const PAGES_PER_GROUP = 5;
  const from = (currentPage - 1) * ITEMS_PER_PAGE; // supabase 쿼리의 range에 전달
  const to = from + ITEMS_PER_PAGE - 1; // supabase 쿼리의 range에 전달

  // 🚩 useQuery를 이용해 페이지별 posts를 캐싱합니다.
  const { data, isLoading } = useQuery({
    queryKey: ['posts', boardType, currentPage, sortOption.value],
    queryFn: () => {
      // 알맞은 쿼리 API에 from과 to를 전달해 range를 조절 후 사용하시면 됩니다.
      return getPostListByType(studyId, boardType, from, to, sortOption.value);
    },
    // posts와 totalCount를 분리해서 획득합니다.
    select: (res) => ({
      posts: res.data,
      totalCount: res.count,
    }),
    staleTime: 1000 * 10,
  });

  // 🚩 usePagination 훅을 이용해 pagination 객체를 획득합니다.
  // totalPages : 총 페이지 개수,
  // currentGroup : 현재 페이지 그룹 ([1,2,3] 또는 [4,5,6])
  // hasPrev, hasNext : 이전, 이후 페이지 존재 여부
  // 위 프로퍼티들은 Pagination 컴포넌트로 전달됩니다.
  const pagination = usePagination(
    currentPage,
    data?.totalCount || 0,
    ITEMS_PER_PAGE,
    PAGES_PER_GROUP,
  );

  // 🚩 매개변수로 전달받은 page로 이동하고, url 경로도 바꿉니다.
  // ⭐ sorting 후 페이지 이동을 하면 url에서 sortBy, page 파라미터
  // 둘 다 사용하기 위해 코드를 수정했습니다.
  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    setCurrentPage(page);
    params.set('page', page); // url에서 page와 sortBy 파라미터 동시 적용
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />

      {data?.posts.length === 0 ? (
        <NoResults message={'게시글이 존재하지 않습니다.'} />
      ) : (
        <div className="flex flex-col">
          {!isLoading && (
            <>
              <div className="flex items-center px-6 h-12">
                {/* ⭐ DropdownBox에 sort 관련 로직을 props로 전달합니다. (드롭박스는 UI만 관리하도록 로직 분리)  */}
                <DropdownBox
                  selectedOption={sortOption}
                  options={options}
                  onChange={handleSortOptionChange}
                  size={md ? 'medium' : 'small'}
                />
                <Button
                  size={md ? 'medium' : 'small'}
                  className="ml-auto"
                  onClick={() =>
                    navigate(`/study/${studyId}/${boardType}/write`)
                  }
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
                {/* 🚩 Pagination 컴포넌트에 알맞은 props를 전달합니다. */}
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
      )}
    </div>
  );
};

export default Board;
