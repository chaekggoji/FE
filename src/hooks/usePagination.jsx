import { useMemo } from 'react';

const usePagination = (
  currentPage,
  totalCount,
  itemsPerPage,
  pagesPerGroup = 3,
) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage); // 총 페이지 개수
  const currentGroupIndex = Math.floor((currentPage - 1) / pagesPerGroup); // 어떤 pageGroup를 표시할지 정하는 인덱스

  // pagesPerGroup 맞춰 pageGroups를 나누는 로직
  // 예시) totalPages가 7이고, pagesPerGroup 3이라면
  // pageGroups는 [[1,2,3],[4,5,6],[7]]로 설정됩니다.
  const pageGroups = useMemo(() => {
    const newPageGroups = [];

    for (let i = 1; i <= totalPages; i += pagesPerGroup) {
      const group = [];
      for (let j = 0; j < pagesPerGroup && i + j <= totalPages; j++) {
        group.push(i + j);
      }
      newPageGroups.push(group);
    }
    return newPageGroups;
  }, [totalPages, pagesPerGroup]);

  return {
    totalPages,
    currentGroup: pageGroups[currentGroupIndex] || [],
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
};

export default usePagination;
