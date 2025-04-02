// React 라이브러리
import { useState, useEffect } from 'react';
// hook
import useMediaQuery from '@hooks/useMediaQuery';
import { SORT_OPTIONS } from '@/constants/bookSearch';
// 외부 패키지
import supabase from '@/libs/supabase'; // Supabase 설정 파일 불러오기
// 컴포넌트
import Pagination from '@components/pages/study/home/Pagination';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import Filters from '@components/pages/study/home/Filters';
import SearchBar from '@components/pages/study/home/SearchBar';
import BookItem from '@components/common/BookItem';
import StudyItem from '@components/pages/study/home/StudyItem';
import { StudyNoResults } from '@components/pages/study/home/StudyNoResults';

export default function StudyHome() {
  const [studies, setStudies] = useState([]);
  const [books, setBooks] = useState([]);
  // 사용자가 입력 중인 값
  const [search, setSearch] = useState('');
  // 실제 검색 버튼 클릭 시 반영되는 값
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filter, setFilter] = useState('all');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  // 전체 몇 페이지 있는지를 저장
  const [totalPages, setTotalPages] = useState(1);
  const [studyCount, setStudyCount] = useState(6); // 기본은 모바일 6개

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    console.log("Updated searchKeyword:", searchKeyword); // searchKeyword 값이 변경될 때마다 출력
    // searchKeyword가 변경되면 fetchStudies 호출
    if (searchKeyword) {
      fetchStudies(searchKeyword, filter, duration, category, sort);
    }
  }, [searchKeyword, filter, duration, category, sort]);  // 검색어, 필터, 기간, 카테고리, 정렬 변경 시마다 실행

  // SearchBar에서 Enter키를 누를 때도 검색
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  // 추천 도서 섹션 개수
  let bookCount = 2; // 기본값: 모바일은 2개
  if (isTablet) {
    bookCount = 3; // 태블릿은 3개
  } else if (isDesktop) {
    bookCount = 4; // 데스크탑은 4개
  }

  useEffect(() => {
    if (isMobile) {
      setStudyCount(6);
    } else if (isTablet) {
      setStudyCount(9);
    } else {
      setStudyCount(12);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    async function fetchStudies() {
      const itemsPerPage = studyCount; // 화면 크기에 따라 6, 9, 12로 자동 조절됨
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // 1. 스터디, 책, 카테고리 가져오기
      let query = supabase
        .from('studies')
        .select(`
          *,
          books (
            id,
            title,
            thumb_url,
            category_id,
            book_categories(
              id,
              title
            )
          )
        `, { count: 'exact' })
        .ilike('title', `%${searchKeyword}%`); // 키워드 조건


      // 검색 조건 적용
      if (searchKeyword) {
        const keyword = `%${searchKeyword}%`;

        if (filter === 'study' || filter === 'all') {
          query = query.ilike('title', keyword); // 스터디 제목
        }
      }

      // 📅 기간 필터 (예시: 나중에 더 정교하게)
      if (duration) {
        query = query.gte('start_date', '2024-01-01').lte('end_date', '2025-12-31');
      }

      // 📂 카테고리 필터
      if (category && category !== 'all') {
        query = query.eq('books.category_id', category); // category가 문자열로 있다면
      }

      // 🔃 정렬
      if (sort === 'latest') {
        query = query.order('start_date', { ascending: false });
      } else if (sort === 'oldest') {
        query = query.order('start_date', { ascending: true });
      }

      // 페이지 범위
      query = query.range(from, to);

      // Supabase에 요청
      const { data: studies, count, error } = await query;
      if (error) {
        console.error('스터디 불러오기 오류:', error);
        return;
      }

      // 2. 스터디 참여자 목록 불러오기
      const { data: participants, error: pError } = await supabase
        .from('study_participants')
        .select('study_id');
      if (pError) {
        console.error('참여자 불러오기 오류: ', pError.message);
        return;
      }

      // 3. 참여 인원 수를 스터디별로 세기
      const participantCountMap = {};
      for (const p of participants) {
        const id = p.study_id;
        participantCountMap[id] = (participantCountMap[id] || 0) + 1;
      }

      // 4. 참여 인원 수를 스터디 데이터에 붙이기
      const studiesWithCounts = studies.map((study) => ({
        ...study,
        participantCount: participantCountMap[study.id] || 0,
      }));

      // 필터 상태를 '전체'로 설정하고 검색 실행
      const onSearch = () => {
        console.log("onSearch called");
        setFilter('전체');
        setDuration('전체');
        setCategory('전체');
        setSort('최신순');
        setSearchKeyword(search); // 실제 검색어 적용
        fetchStudies(search, filter, duration, category, sort);
      };

      // 5. 화면에 데이터 적용
      setStudies(studiesWithCounts);
      setTotalPages(Math.ceil(count / itemsPerPage));
    }

    async function fetchBooks() {
      let bookQuery = supabase.from('books').select('*');

      if (searchKeyword) {
        const keyword = `%${searchKeyword}%`;

        if (filter === 'title') {
          bookQuery = bookQuery.ilike('title', keyword);
        } else if (filter === 'author') {
          bookQuery = bookQuery.ilike('author', keyword);
        } else if (filter === 'all') {
          bookQuery = bookQuery.or(`title.ilike.${keyword},author.ilike.${keyword}`);
        }
      }

      const { data, error } = await bookQuery;
      if (error) {
        console.error('책 데이터 불러오기 오류:', error);
      } else {
        setBooks(data);
      }
    }

    fetchStudies();
    fetchBooks();
  }, [currentPage, searchKeyword, category, duration, sort, studyCount]);

  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      {/* 추천 도서 섹션 */}
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
      {/* 추후 넷플릭스 슬라이드 방식으로 수정할 예정 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12'>
        {books.slice(0, bookCount).map((book) => (
          <div key={book.id} className='w-full max-w-[160px] mx-auto'>
            <BookItem
              size='medium'
              title={book.title}
              author={book.author}
              thumbnail={book.thumbnail}
              link={book.link}
            />
          </div>
        ))}
      </div>

      {/* 검색 바 */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        setDuration={setDuration}  // setDuration 전달
        setCategory={setCategory}  // setCategory 전달
        setSort={setSort}          // setSort 전달
        onSearch={onSearch}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />


      {/* 필터 & 정렬 */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-4'>
        <Filters
          duration={duration}
          setDuration={setDuration}
          category={category}
          setCategory={setCategory}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
        {/* 반응형에도 가장 우측 위치하도록 */}
        <div className='md:ml-auto'>
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={SORT_OPTIONS}

            buttonClassName='bg-primary-200 text-white border-primary-300'
            menuClassName='border-primary-300'
            itemClassName='rounded-none hover:text-white'
            widthClass="w-48"
          />
        </div>
      </div>

      {/* 스터디 리스트 */}
      <div className='study-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-16 gap-y-12 my-12'>
        {studies.length === 0 ? (
          <StudyNoResults key={searchKeyword} />
        ) : (studies.map((study, index) => (
          <StudyItem
            key={study.id}
            study={study}
            index={index}
            totalItems={studies.length}
          />
        ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div >
  );
}
