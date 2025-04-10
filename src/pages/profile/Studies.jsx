import Pagination from '@components/common/Pagination';
import StudyCardList from '@components/pages/profile/StudyCardList';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import { STATUS_FILTER } from '@/constants/bookSearch';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Studies = () => {
  const [sort, setSort] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);

  // TODO: 현재는 데이터 로직 없이 UI만 먼저 구현 -> 데이터 로직과 함께 구현하기
  const location = useLocation();
  const navigate = useNavigate();

  // URL에서 페이지 정보 가져오기
  const getPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return page;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  // 기본 페이지네이션 정보 (임시)
  const currentGroup = [1, 2, 3]; // 현재 표시할 페이지 그룹
  const hasPrev = currentPage > 1; // 이전 페이지 있음 여부
  const hasNext = currentPage < 10; // 다음 페이지 있음 여부 (임시로 10페이지까지 있다고 가정)

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  return (
    <div className="lg:p-20 md:p-16 sm:p-10">
      <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto p-10 bg-white rounded-2xl">
        <h2 className="text-3xl text-center py-7.5">스터디 목록</h2>
        <div className="flex justify-end mb-7.5">
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={STATUS_FILTER}
            buttonClassName="bg-primary-200 text-white border-primary-300"
            menuClassName="border-primary-300"
            itemClassName="rounded-none hover:text-white"
            widthClass="w-30"
          />
        </div>
        <StudyCardList />
        <div className="py-7.5">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            currentGroup={currentGroup}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Studies;
