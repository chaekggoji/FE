// 📌 bookSearch.js (상수 파일은 UI를 렌더링하지 않기에 .js로 파일)

// 검색 기준 옵션
export const SEARCH_CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '도서명' },
  { value: 'study', label: '스터디 명' },
  { value: 'author', label: '저자명' },
];

// 진행 기간 필터
export const DURATION_FILTERS = [
  { value: 'duration_all', label: '기간 전체' },
  { value: '1m', label: '1개월 미만' },
  { value: '3m', label: '3개월 미만' },
  { value: '6m', label: '6개월 미만' },
  { value: '6m+', label: '6개월 이상' },
];

// 도서 카테고리 필터
export const BOOK_CATEGORIES = [
  { value: 'category_all', label: '카테고리 전체' },
  { value: 'humanities', label: '인문' },
  { value: 'current_affairs', label: '시사/상식' },
  { value: 'science', label: '과학' },
  { value: 'it', label: 'IT' },
  { value: 'novel', label: '소설' },
  { value: 'poetry', label: '시/에세이' },
  { value: 'self_dev', label: '자기계발' },
  { value: 'children', label: '어린이' },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'alphabetical', label: '가나다순' },
];
