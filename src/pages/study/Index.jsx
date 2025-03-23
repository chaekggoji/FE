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
    console.log('검색 실행. 검색어:', search, '| 필터:', filter);
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

  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      {/* 추천 도서 섹션 */}
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
      {/* 추후 넷플릭스 슬라이드 방식으로 수정할 예정 */}
      <div className='grid grid-cols-4 gap-8 my-12 sm:grid-cols-2 lg:grid-cols-4'>
        {books.slice(0, 4).map(book => (
          <BookItem
            key={book.id}
            size='medium'
            title={book.title}
            author={book.author}
            thumbnail={book.thumbnail}
            link={book.link}
          />
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
      <div className='flex items-center justify-between mt-4'>
        <Filters
          duration={duration}
          setDuration={setDuration}
          category={category}
          setCategory={setCategory}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
        <SortDropdown
          sort={sort}
          setSort={setSort}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      </div>

      {/* 스터디 리스트 */}
      <div className="study-list grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-16 my-12">
        {studyList.map((study, index) => (
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
    </div>
  );
}
