import Pagination from '@components/common/Pagination';
import StudyCard from '@components/pages/profile/StudyCard'; // StudyCardList 대신 StudyCard 임포트
import SortDropdown from '@components/pages/study/home/SortDropdown';
import { STATUS_FILTER } from '@/constants/bookSearch';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getJoinedStudies } from '@queries/profile/getJoinedStudies';
import WhiteSpinner from '@components/common/WhiteSpinner';

const Studies = () => {
  const { userId } = useParams(); // URL에서 사용자 ID 가져오기
  const parsedUserId = parseInt(userId, 10);

  const [sort, setSort] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filteredStudies, setFilteredStudies] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // URL에서 페이지 정보 가져오기
  const getPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return page;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  // React Query로 스터디 목록 가져오기
  const {
    data: studies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userStudies', parsedUserId],
    queryFn: () => getJoinedStudies(parsedUserId),
    enabled: !!parsedUserId,
  });

  // 정렬 옵션 변경 시 스터디 목록 필터링
  useEffect(() => {
    if (!studies) return;

    if (sort === 'all') {
      setFilteredStudies(studies);
    } else {
      setFilteredStudies(studies.filter((study) => study.status === sort));
    }

    // 필터 변경 시 첫 페이지로 이동
    setCurrentPage(1);
    navigate('?page=1', { replace: true });
  }, [sort, studies, navigate]);

  // 페이지네이션 계산
  const itemsPerPage = 10;
  const totalPages = Math.ceil((filteredStudies?.length || 0) / itemsPerPage);

  // 현재 페이지에 표시할 스터디 목록
  const currentStudies = filteredStudies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 현재 페이지 그룹 계산 (5개씩 표시)
  const groupSize = 5;
  const currentGroupIndex = Math.floor((currentPage - 1) / groupSize);
  const currentGroup = Array.from(
    { length: Math.min(groupSize, totalPages - currentGroupIndex * groupSize) },
    (_, i) => currentGroupIndex * groupSize + i + 1,
  );

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (isLoading) {
    return <WhiteSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        스터디 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

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

        {/* StudyCardList 대신 개별 StudyCard 사용 */}
        {currentStudies.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-5">
            {currentStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            {sort === 'all'
              ? '참여 중인 스터디가 없습니다.'
              : `${sort === 'inProgress' ? '진행 중인' : '완료된'} 스터디가 없습니다.`}
          </div>
        )}

        {totalPages > 1 && (
          <div className="py-7.5">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              currentGroup={currentGroup}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Studies;
