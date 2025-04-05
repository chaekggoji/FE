// React 라이브러리
import { useState, useEffect } from 'react';
// hook
import useMediaQuery from '@hooks/useMediaQuery';
import { SORT_OPTIONS } from '@/constants/bookSearch';
// 외부 패키지
import supabase from '@/libs/supabase';
// 컴포넌트
import Pagination from "@components/common/Pagination";
import SortDropdown from '@components/pages/study/home/SortDropdown';
import Filters from '@components/pages/study/home/Filters';
import SearchBar from '@components/pages/study/home/SearchBar';
import BookItem from '@components/common/BookItem';
import StudyItem from '@components/pages/study/home/StudyItem';
import { StudyNoResults } from '@components/pages/study/home/StudyNoResults';

export default function StudyHome() {
  const [studies, setStudies] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filter, setFilter] = useState('all');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [studyCount, setStudyCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [randomKeyword, setRandomKeyword] = useState('');
  const [searchOptions, setSearchOptions] = useState(null); // 처음엔 null


  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const DEFAULT_CATEGORY = '카테고리 전체';
  const DEFAULT_DURATION = '기간 선택';


  useEffect(() => {
    if (isMobile) setStudyCount(6);
    else if (isTablet) setStudyCount(9);
    else if (isDesktop) setStudyCount(12);
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    if (searchOptions) {
      fetchStudies(searchOptions);
    }
  }, [searchOptions, currentPage]);

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

  // 📁 Index.jsx 내의 fetchStudies 함수 (검색 버튼 클릭 시에만 실행)
  async function fetchStudies({ keyword, filter, duration, category, sort }) {
    setLoading(true);
    try {
      const itemsPerPage = studyCount;
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
      if (duration && duration !== '기간 전체') {
        filteredStudies = filteredStudies.filter((s) => {
          const start = new Date(s.start_date);
          const end = new Date(s.end_date);
          const durationInDays = (end - start) / (1000 * 60 * 60 * 24);
          if (duration === '1개월 미만') return durationInDays < 31;
          if (duration === '3개월 미만') return durationInDays < 92;
          if (duration === '6개월 미만') return durationInDays < 182;
          if (duration === '6개월 이상') return durationInDays >= 183;
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
      console.error('📛 fetchStudies 에러:', err);
      alert('스터디 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (studyCount > 0 && searchOptions && typeof searchOptions.keyword !== 'undefined') {
      fetchStudies(searchOptions);
    }
  }, [searchOptions, currentPage, studyCount]);

  const onSearch = () => {
    setSearchOptions({
      keyword: search,
      filter,
      category: category === DEFAULT_CATEGORY ? '' : category,
      duration: duration === DEFAULT_DURATION ? '' : duration,
      sort,
    });
    setCurrentPage(1);
  };

  async function fetchBooksFromKakao(keyword) {
    console.log('🔥 fetchStudies 실행:', { keyword, filter, category, duration, sort });
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
        throw new Error("책 데이터를 불러오는 데 실패했습니다.");
      }

      setBooks(result.documents);
    } catch (error) {
      console.error("📛 카카오 책 API 에러:", error);
      alert("책 정보를 불러오는 중 문제가 발생했습니다.");
      setBooks([]);
    }
  }

  return (
    <div className='p-10 lg:-mx-10 md:-mx-8 sm:-mx-6'>
      <h1 className='text-4xl my-4'>📚 어떤 책이 인기가 많을까요?</h1>
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

      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-4'>
        <Filters
          duration={duration}
          setDuration={setDuration}
          category={category}
          setCategory={setCategory}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          categoryList={categoryList}
        />
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
            widthClass='w-48'
          />
        </div>
      </div>

      <div className='study-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-16 gap-y-12 my-12'>
        {loading ? (
          <p className='text-2xl font-semibold text-gray-500 col-span-full text-center'>
            로딩 중입니다...
          </p>
        ) : studies.length === 0 ? (
          <StudyNoResults keyword={searchOptions?.keyword} />
        ) : (
          studies.map((study) => (
            <StudyItem key={study.id} study={study} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}