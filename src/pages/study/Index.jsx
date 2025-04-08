// React 라이브러리
import { useState, useEffect } from 'react';
// hook
import useMediaQuery from '@hooks/useMediaQuery';
import { SORT_OPTIONS } from '@/constants/bookSearch';
// 외부 패키지
import supabase from '@/libs/supabase';
import ClipLoader from "react-spinners/ClipLoader";
// 컴포넌트
import Pagination from '@components/common/Pagination';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import Button from '@components/common/Button';
import Filters from '@components/pages/study/home/Filters';
import SearchBar from '@components/pages/study/home/SearchBar';
import BookItem from '@components/common/BookItem';
import StudyItem from '@components/pages/study/home/StudyItem';
import { StudyNoResults } from '@components/pages/study/home/StudyNoResults';

export default function StudyHome() {
  const [studies, setStudies] = useState([]); // 화면에 보여줄 스터디 목록
  const [books, setBooks] = useState([]); // 상단 추천 도서 리스트 (카카오 API)
  const [randomKeyword, setRandomKeyword] = useState(''); // 상단 도서 추천용 랜덤 키워드 (카테고리 중 하나 선택)
  const [search, setSearch] = useState(''); // 검색창 입력값
  const [filter, setFilter] = useState('all'); // 검색 필터 (도서명 / 저자명 / 스터디명 / 전체)
  const [duration, setDuration] = useState(''); // 기간 필터 ('1m', '3m', ...)
  const [category, setCategory] = useState(''); // 카테고리 필터 (supabase에서 동적으로 가져옴)
  const [categoryList, setCategoryList] = useState([]); // Supabase에서 받아온 카테고리 리스트
  const [sort, setSort] = useState('latest'); // 정렬 방식(최신순, 인기순, 가나다순)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [openDropdown, setOpenDropdown] = useState(null); // 열려 있는 드롭다운 종류

  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수(스터디 수 기반 계산)
  const [studyCount, setStudyCount] = useState(0); // 화면 너비에 따른 한 페이지 당 표시할 스터디 개수
  const [loading, setLoading] = useState(false); // 로딩 상태 여부
  const [searchOptions, setSearchOptions] = useState(null); // 검색 조건 객체 (버튼 클릭 시 기준으로 저장됨)

  // 반응형 기준 설정
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // 필터: 카테고리, 기간
  const DEFAULT_CATEGORY = '카테고리 전체';
  const DEFAULT_DURATION = '기간 선택';

  // 현재 페이지 그룹 계산 -> Pagination에 넘김
  const generatePageGroup = (currentPage, totalPages, groupSize = 5) => {
    const start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const currentGroup = generatePageGroup(currentPage, totalPages);
  const hasPrev = currentGroup[0] > 1;
  const hasNext = currentGroup[currentGroup.length - 1] < totalPages;

  // 스터디 카드 개수 설정
  useEffect(() => {
    if (isMobile) setStudyCount(6);
    else if (isTablet) setStudyCount(9);
    else if (isDesktop) setStudyCount(12);
  }, [isMobile, isTablet, isDesktop]);

  // 검색 실행 시 fetch
  useEffect(() => {
    if (searchOptions) {
      fetchStudies(searchOptions);
    }
  }, [searchOptions, currentPage]);

  // 초기 렌더링 시 책, 검색 기본조건 세팅
  useEffect(() => {
    if (studyCount > 0) {
      fetchBooksFromKakao();
      setSearchOptions({
        keyword: '',
        filter: 'all',
        duration: '',
        category: '',
        sort: 'latest',
      }); // ✅ 최초는 최신 정렬만
    }
  }, [studyCount]);

  // 카테고리 데이터 가져오기 (Supabase의 book_categories 테이블의 title)
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('book_categories').select('title');
      if (!error && data) {
        const titles = data.map((c) => c.title);
        setCategoryList(titles);

        // ✅ 랜덤 키워드 선택
        const random = titles[Math.floor(Math.random() * titles.length)];
        setRandomKeyword(random);
      }
    };
    fetchCategories();
  }, []);

  // 검색 버튼 클릭 시 실행되는 함수
  const onSearch = (keyword, filter, duration, category, sort) => {
    if (!keyword.trim()) {
      handleResetSearch();
      return;
    }
    const options = { keyword, filter, duration, category, sort };
    updateSearchParams(options);
    setCurrentPage(1);
  };

  const DEFAULTS = {
    keyword: '',
    filter: 'all',
    duration: '',
    category: '',
    sort: 'latest'
  };

  const updateSearchParams = (options) => {
    const newParams = new URLSearchParams();
    Object.entries(options).forEach(([key, val]) => {
      if (val) newParams.set(key, val);
    });
    setSearchParams(newParams);
  };

  // 검색 초기화 함수
  const handleResetSearch = () => {
    updateSearchParams(DEFAULTS);
    setCurrentPage(1);
  };

  // 카카오 API 도서 썸네일 불러오기
  async function fetchBooksFromKakao(keyword) {
    try {
      const query = keyword || randomKeyword || '인문'; // fallback까지 안전하게

      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=12`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`카카오 API 오류: HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result || !Array.isArray(result.documents)) {
        throw new Error('책 데이터를 불러오는 데 실패했습니다.');
      }

      setBooks(result.documents);
    } catch (error) {
      setBooks(result.documents);
    }
  }

  // 📁 Index.jsx 내의 fetchStudies 함수 (검색 버튼 클릭 시에만 실행)
  async function fetchStudies({ keyword, filter, duration, category, sort }) {
    setLoading(true);
    try {
      const itemsPerPage = studyCount;
      if (!itemsPerPage || itemsPerPage <= 0) {
        return;
      }
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // 1. Supabase에서 스터디 + 책 + 카테고리 조인해서 가져오기
      const { data: fetchedStudies, error } = await supabase
        .from('studies')
        .select(`
        *,
        books (
          id,
          title,
          author,
          thumb_url,
          category_id,
          book_categories (
            id,
            title
          )
        )
      `);

      if (error || !fetchedStudies) throw new Error('스터디 데이터를 불러오는 데 실패했습니다.');

      // 2. 키워드 필터링 (도서명/저자명/스터디명/전체)
      let filteredStudies = [...fetchedStudies];
      if (keyword) {
        const lower = keyword.toLowerCase();
        if (filter === 'title') {
          filteredStudies = filteredStudies.filter(s => s.books?.title?.toLowerCase().includes(lower));
        } else if (filter === 'author') {
          filteredStudies = filteredStudies.filter(s => s.books?.author?.toLowerCase().includes(lower));
        } else if (filter === 'study') {
          filteredStudies = filteredStudies.filter(s => s.title?.toLowerCase().includes(lower));
        } else {
          filteredStudies = filteredStudies.filter((s) => {
            const studyTitle = s.title?.toLowerCase() || '';
            const bookTitle = s.books?.title?.toLowerCase() || '';
            const bookAuthor = s.books?.author?.toLowerCase() || '';
            return (
              studyTitle.includes(lower) ||
              bookTitle.includes(lower) ||
              bookAuthor.includes(lower)
            );
          });
        }
      }

      // 3. 기간 필터링 (1m, 3m, 6m, 6m+)
      if (duration && duration !== 'duration_all') {
        filteredStudies = filteredStudies.filter((s) => {
          const start = new Date(s.start_date);
          const end = new Date(s.end_date);
          if (isNaN(start) || isNaN(end)) return false; // 필터 대상 제외
          const durationInDays = (end - start) / (1000 * 60 * 60 * 24);
          if (duration === '1m') return durationInDays < 31;
          if (duration === '3m') return durationInDays < 92;
          if (duration === '6m') return durationInDays < 182;
          if (duration === '6m+') return durationInDays >= 183;
          return true;
        });
      }

      // 4. 카테고리 필터링
      if (
        typeof category === 'string' &&
        category !== 'category_all' &&
        category !== '카테고리 전체' &&
        categoryList.includes(category)
      ) {
        filteredStudies = filteredStudies.filter(
          (s) => s.books?.book_categories?.title === category
        );
      }

      // 5. 참여자 수 조회 → participantCount 계산
      const { data: participants, error: pError } = await supabase
        .from('study_participants')
        .select('study_id');

      if (pError || !participants) throw new Error('참여자 수 불러오기 실패');

      const participantCountMap = {};
      for (const p of participants) {
        participantCountMap[p.study_id] = (participantCountMap[p.study_id] || 0) + 1;
      }

      // 6. 참여자 수 추가 및 정렬 기준에 따라 정렬
      const studiesWithCounts = filteredStudies.map((study) => {
        const participantCount = participantCountMap[study.id] || 0;
        const remain = (study.capacity || 0) - participantCount;
        return { ...study, participantCount, remain };
      });

      if (sort === 'latest') {
        studiesWithCounts.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
      } else if (sort === 'popular') {
        studiesWithCounts.sort((a, b) => {
          if (a.remain === b.remain) {
            return new Date(b.start_date) - new Date(a.start_date);
          }
          return a.remain - b.remain; // 잔여 인원 오름차순
        });
      } else if (sort === 'alphabetical') {
        studiesWithCounts.sort((a, b) => a.title.localeCompare(b.title));
      }

      // 7. 페이징 적용
      setStudies(studiesWithCounts.slice(from, to + 1));
      setTotalPages(Math.ceil(studiesWithCounts.length / itemsPerPage));
    } catch (err) {
      console.err('스터디 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  // 최초 렌더링 시에도 검색 실행
  useEffect(() => {
    if (studyCount > 0 && searchOptions && typeof searchOptions.keyword !== 'undefined') {
      fetchStudies(searchOptions);
    }
  }, [searchOptions, currentPage, studyCount]);

  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
      {/* 추천 도서 영역 */}
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

      {/* 검색바 */}
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

      {/* 필터 & 정렬 & 검색 초기화 */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4'>
        <div className='flex flex-wrap md:flex-row items-center gap-4'>
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={SORT_OPTIONS}
            buttonClassName='bg-primary-200 border-2 border-primary-400/50 text-white text-sm sm:text-base md:text-lg lg:text-xl pl-4 py-2 w-full min-w-[96px]'
            menuClassName='border-primary-300'
            itemClassName='rounded-none hover:text-white'
            widthClass='w-36'
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
          className='bg-primary-200 border-2 border-primary-300/50 hover:bg-primary-300 text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 py-3'
          onClick={handleResetSearch}>
          검색 초기화
        </Button>
      </div>

      {/* 스터디 리스트 */}
      <div className='study-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-16 gap-y-12 my-12'>
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-72">
            {/* spinner 사용으로 UI 개선 */}
            <ClipLoader color="#AFC8AD" size={100} />
          </div>
        ) : studies.length === 0 ? (
          <StudyNoResults keyword={searchOptions?.keyword} />
        ) : (
          studies.map((study) => (
            <StudyItem key={study.id} study={study} />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        currentGroup={currentGroup}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}