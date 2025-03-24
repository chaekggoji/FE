// React 라이브러리
import { useState, useEffect } from 'react';
// 외부 패키지
import supabase from '@/libs/supabase'; // Supabase 설정 파일 불러오기
// 이미지/아이콘
import Pagination from '@components/pages/study/home/Pagination';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import Filters from '@components/pages/study/home/Filters';
import SearchBar from '@components/pages/study/home/SearchBar';
import BookItem from '@components/common/BookItem';
import StudyItem from '@components/pages/study/home/StudyItem';
import useMediaQuery from '@hooks/useMediaQuery';


export default function StudyHome() {
  const [studies, setStudies] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // UI 확인용으로 넣은 임시 데이터
  const studyList = [
    { id: 1, category: '인문', title: '다슬이를 도와줘! 다슬이를 도와줘!', participants: 5, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/170' },
    { id: 2, category: '에세이', title: '친구 사귀는 법', participants: 4, capacity: 8, start_date: '2025-03-01', end_date: '2025-04-20', thumbnail: 'https://picsum.photos/120/174' },
    { id: 3, category: 'IT', title: '다음 판으로 갈래요', participants: 6, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/175' },
    { id: 4, category: '수필', title: '여기 왔던 덴데', participants: 3, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/173' },
    { id: 5, category: '인문', title: '다슬이를 도와줘!', participants: 5, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/170' },
    { id: 6, category: '에세이', title: '친구 사귀는 법', participants: 4, capacity: 8, start_date: '2025-03-01', end_date: '2025-04-20', thumbnail: 'https://picsum.photos/120/174' },
    { id: 7, category: 'IT', title: '다음 판으로 갈래요', participants: 6, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/175' },
    { id: 8, category: '수필', title: '여기 왔던 덴데', participants: 3, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/173' },
    { id: 9, category: '인문', title: '다슬이를 도와줘!', participants: 5, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/170' },
    { id: 10, category: '에세이', title: '친구 사귀는 법', participants: 4, capacity: 8, start_date: '2025-03-01', end_date: '2025-04-20', thumbnail: 'https://picsum.photos/120/174' },
    { id: 11, category: 'IT', title: '다음 판으로 갈래요', participants: 6, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/175' },
    { id: 12, category: '수필', title: '여기 왔던 덴데', participants: 3, capacity: 8, start_date: '2025-03-01', end_date: '2025-03-31', thumbnail: 'https://picsum.photos/120/173' },
  ];

  const onSearch = () => {
    console.log('검색 실행. 검색어:', search, '필터:', filter);
  };


  useEffect(() => {
    async function fetchStudies() {
      let query = supabase.from('studies').select('*');

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      if (duration) {
        query = query.gte('start_date', '2024-01-01').lte('end_date', '2025-12-31');
      }
      if (category) {
        query = query.eq('book_id', category);
      }
      if (sort === 'latest') {
        query = query.order('start_date', { ascending: false });
      } else if (sort === 'oldest') {
        query = query.order('start_date', { ascending: true });
      }

      const { data, error } = await query;
      if (error) console.error('스터디 데이터 불러오기 오류:', error);
      else setStudies(data);
    }

    async function fetchBooks() {
      const { data, error } = await supabase.from('books').select('*');
      if (error) console.error('책 데이터 불러오기 오류:', error);
      else setBooks(data);
    }

    fetchStudies();
    fetchBooks();
  }, []);

  // 추천 도서 섹션 개수
  let bookCount = 2; // 기본값: 모바일은 2개

  if (isTablet) {
    bookCount = 3; // 태블릿은 3개
  } else if (isDesktop) {
    bookCount = 4; // 데스크탑은 4개
  }

  // 스터디 리스트 섹션 개수
  let studyCount = 6; // 기본: 모바일 (2 × 3)

  if (isTablet) {
    studyCount = 9; // 태블릿 (3 × 3)
  } else if (isDesktop) {
    studyCount = 12; // 데스크탑 (4 × 3)
  }



  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      {/* 추천 도서 섹션 */}
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
      {/* 추후 넷플릭스 슬라이드 방식으로 수정할 예정 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12'>
        {books.slice(0, bookCount).map((book) => (
          <div key={book.id} className="w-full max-w-[160px] mx-auto">
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
        <div className="md:ml-auto">
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
      </div>

      {/* 스터디 리스트 */}
      <div className="study-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center  gap-12 my-12">
        {studyList.slice(0, studyCount).map((study, index) => (
          <StudyItem
            key={study.id}
            study={study}
            index={index}
            totalItems={studyList.length}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </div >
  );
}
