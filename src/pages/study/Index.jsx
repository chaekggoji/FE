// React 라이브러리
import { useState, useEffect } from 'react';
// 사용자 정의 훅 및 상수
import useMediaQuery from '@hooks/useMediaQuery';
import { SORT_OPTIONS } from '@/constants/bookSearch';
import { useQueryParams } from '@hooks/useQueryParams.jsx';
// 외부 API 및 라이브러리
import supabase from '@/libs/supabase';
import ClipLoader from "react-spinners/ClipLoader";
// 컴포넌트
import Pagination from '@components/common/Pagination';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import Filters from '@components/pages/study/home/Filters';
import SearchBar from '@components/pages/study/home/SearchBar';
import Button from '@components/common/Button';
import BookItem from '@components/common/BookItem';
import StudyItem from '@components/pages/study/home/StudyItem';
import { StudyNoResults } from '@components/pages/study/home/StudyNoResults';

export default function StudyHome() {
  // 스터디 & 책 목록 상태
  const [studies, setStudies] = useState([]);
  const [books, setBooks] = useState([]);
  // 검색 관련 상태
  const [randomKeyword, setRandomKeyword] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  // 기타 UI 상태
  const [categoryList, setCategoryList] = useState([]);
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [studyCount, setStudyCount] = useState(0); // 화면 크기에 따라 스터디 수 결정
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState(null);
  // 쿼리 파라미터 (URL 상태)
  const [queryParams, setQueryParams] = useQueryParams();

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  // 셀렉트 기본값
  const DEFAULT_CATEGORY = '카테고리 전체';
  const DEFAULT_DURATION = '기간 선택';
  // 모든 필터 조건, 카테고리 목록, 화면 크기 기준 스터디 수, 데이터 로딩 완료 여부까지 준비가 끝났을 때만 스터디 목록을 보여주기 위해 사용되는 상태
  const isReady = searchOptions && categoryList.length > 0 && studyCount > 0 && !loading;

  const generatePageGroup = (currentPage, totalPages, groupSize = 5) => {
    const start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const currentGroup = generatePageGroup(currentPage, totalPages);
  const hasPrev = currentGroup[0] > 1;
  const hasNext = currentGroup[currentGroup.length - 1] < totalPages;

  const handleResetSearch = () => {
    const defaultOptions = {
      keyword: '',
      filter: 'all',
      duration: '',
      category: '',
      sort: 'latest',
    };
    setSearch('');
    setFilter('all');
    setDuration('');
    setCategory('');
    setSort('latest');
    setSearchOptions(defaultOptions);
    setCurrentPage(1);
    setQueryParams({}); // URL도 초기화
  };

  useEffect(() => {
    if (isMobile) setStudyCount(6);
    else if (isTablet) setStudyCount(9);
    else if (isDesktop) setStudyCount(12);
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    if (searchOptions && categoryList.length > 0) {
      fetchStudies(searchOptions);
    }
  }, [searchOptions, currentPage, categoryList]);

  useEffect(() => {
    const keyword = queryParams.get('keyword') || '';
    const filter = queryParams.get('filter') || 'all';
    const category = queryParams.get('category') || '';
    const duration = queryParams.get('duration') || '';
    const sort = queryParams.get('sort') || 'latest';
    const page = parseInt(queryParams.get('page') || '1', 10);

    // URL 파라미터를 상태에 반영하여 검색 조건 초기 세팅
    setSearch(keyword);
    setFilter(filter);
    setCategory(category);
    setDuration(duration);
    setSort(sort);
    setCurrentPage(page);

    // 검색 조건 객체로 저장 (이걸 기반으로 fetchStudies 실행됨)
    setSearchOptions({ keyword, filter, category, duration, sort });
  }, [queryParams, studyCount]); // studyCount가 설정된 후 실행되도록 의존성에 추가

  useEffect(() => {
    if (studyCount > 0) {
      fetchBooksFromKakao();
      // 이미 searchOptions가 있으면(쿼리에서 읽어왔을 경우) 초기화 X
      if (!searchOptions) {
        setSearchOptions({
          keyword: '',
          filter: 'all',
          duration: '',
          category: '',
          sort: 'latest',
        });
      }
    }
  }, [studyCount]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('book_categories').select('title');
      if (!error && data) {
        const titles = data.map((c) => c.title);
        setCategoryList(titles);
        const random = titles[Math.floor(Math.random() * titles.length)];
        setRandomKeyword(random);
      }
    };
    fetchCategories();
  }, []);

  const onSearch = () => {
    if (!search.trim()) {
      // 빈 검색어면 검색 초기화 실행
      handleResetSearch();
      setQueryParams({}); // URL 파라미터도 제거
      return;
    }

    const options = {
      keyword: search,
      filter,
      category: category === DEFAULT_CATEGORY ? '' : category,
      duration: duration === DEFAULT_DURATION ? '' : duration,
      sort,
    };
    setQueryParams({ ...options, page: '1' }); // URL에 저장
    setSearchOptions(options);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);

    // 기존 URL에서 파라미터 유지한 채 page만 수정
    setQueryParams(prev => ({
      ...Object.fromEntries(queryParams.entries()),
      page: pageNum.toString(),
    }));
  };

  async function fetchBooksFromKakao(keyword) {
    try {
      const query = keyword || randomKeyword || '인문';
      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=12`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
          },
        }
      );
      if (!response.ok) throw new Error(`카카오 API 오류: HTTP ${response.status}`);
      const result = await response.json();
      if (!result || !Array.isArray(result.documents)) throw new Error('책 데이터를 불러오는 데 실패했습니다.');
      setBooks(result.documents);
    } catch (error) {
      setBooks([]);
    }
  }

  async function fetchStudies({ keyword, filter, duration, category, sort }) {
    setLoading(true);
    try {
      const itemsPerPage = studyCount;
      if (!itemsPerPage || itemsPerPage <= 0) return;
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data: fetchedStudies, error } = await supabase
        .from('studies')
        .select(`*, books(id, title, author, thumb_url, category_id, book_categories(id, title))`);

      if (error || !fetchedStudies) throw new Error('스터디 데이터를 불러오는 데 실패했습니다.');

      let filteredStudies = [...fetchedStudies];
      // 키워드 필터
      if (keyword) {
        const lower = keyword.toLowerCase();
        if (filter === 'title') filteredStudies = filteredStudies.filter(s => s.books?.title?.toLowerCase().includes(lower));
        else if (filter === 'author') filteredStudies = filteredStudies.filter(s => s.books?.author?.toLowerCase().includes(lower));
        else if (filter === 'study') filteredStudies = filteredStudies.filter(s => s.title?.toLowerCase().includes(lower));
        else filteredStudies = filteredStudies.filter(s => {
          const studyTitle = s.title?.toLowerCase() || '';
          const bookTitle = s.books?.title?.toLowerCase() || '';
          const bookAuthor = s.books?.author?.toLowerCase() || '';
          return studyTitle.includes(lower) || bookTitle.includes(lower) || bookAuthor.includes(lower);
        });
      }
      // 기간 필터
      if (duration && duration !== 'duration_all') {
        filteredStudies = filteredStudies.filter((s) => {
          const start = new Date(s.start_date);
          const end = new Date(s.end_date);
          if (isNaN(start) || isNaN(end)) return false;
          const durationInDays = (end - start) / (1000 * 60 * 60 * 24);
          if (duration === '1m') return durationInDays < 31;
          if (duration === '3m') return durationInDays < 92;
          if (duration === '6m') return durationInDays < 182;
          if (duration === '6m+') return durationInDays >= 183;
          return true;
        });
      }
      // 카테고리 필터
      if (typeof category === 'string' && category !== 'category_all' && category !== '카테고리 전체' && categoryList.includes(category)) {
        filteredStudies = filteredStudies.filter(s => s.books?.book_categories?.title === category);
      }
      // 참여자 수 계산하기
      const { data: participants, error: pError } = await supabase.from('study_participants').select('study_id');
      if (pError || !participants) throw new Error('참여자 수 불러오기 실패');

      const participantCountMap = {};
      for (const p of participants) {
        participantCountMap[p.study_id] = (participantCountMap[p.study_id] || 0) + 1;
      }

      const studiesWithCounts = filteredStudies.map(study => {
        const participantCount = participantCountMap[study.id] || 0;
        const remain = (study.capacity || 0) - participantCount;
        return { ...study, participantCount, remain };
      });
      // 정렬
      if (sort === 'latest') studiesWithCounts.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
      else if (sort === 'popular') studiesWithCounts.sort((a, b) => a.remain - b.remain);
      else if (sort === 'alphabetical') studiesWithCounts.sort((a, b) => a.title.localeCompare(b.title));

      setStudies(studiesWithCounts.slice(from, to + 1));
      setTotalPages(Math.ceil(studiesWithCounts.length / itemsPerPage));
    } catch (err) {
      console.error('스터디 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
      {/* 추천 도서 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12'>
        {books.slice(0, isDesktop ? 4 : isTablet ? 3 : 2).map((book, index) => (
          <div key={index} className='w-full flex justify-center'>
            <BookItem
              title={book.title}
              author={book.authors?.[0] || '작자 미상'}
              thumbnail={book.thumbnail}
              link={book.url}
              size='large'
            />
          </div>
        ))}
      </div>
      {/* 검색 바 / 필터 */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        setDuration={setDuration}
        setCategory={setCategory}
        setSort={setSort}
        onSearch={onSearch}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4'>
        <div className='flex flex-wrap md:flex-row items-center gap-8'>
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={SORT_OPTIONS}
            buttonClassName='bg-primary-200 text-white border-primary-300 pl-4 py-2 text-sm sm:text-base md:text-lg w-32 min-w-[96px]'
            menuClassName='border-primary-300'
            itemClassName='rounded-none hover:text-white'
            widthClass='w-32'
          />
          <Filters
            duration={duration}
            setDuration={setDuration}
            category={category}
            setCategory={setCategory}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            categoryList={categoryList}
          />
        </div>
        <Button
          size={null}
          type={null}
          className='bg-primary-200 border-2 border-primary-300/50 hover:bg-primary-300 text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 min-w-[96px]'
          onClick={handleResetSearch}>
          검색 초기화
        </Button>
      </div>
      {/* 스터디 목록 */}
      <div className='study-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-16 gap-y-12 my-12'>
        {/* 아직 데이터가 준비되지 않았다면 로딩 스피너만 보여줌
        StudyNoResults 깜빡이는 문제 해결 */}
        {!isReady ? (
          <div className='col-span-full flex justify-center items-center h-72'>
            <ClipLoader color='#AFC8AD' size={100} />
          </div>
        ) : studies.length === 0 ? (
          <StudyNoResults keyword={searchOptions?.keyword} />
        ) : (
          studies.map((study) => <StudyItem key={study.id} study={study} />)
        )}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        currentGroup={currentGroup}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}
