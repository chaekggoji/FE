// 쿼리 문자열을 읽고 수정하는 훅
import { useLocation, useNavigate } from 'react-router';
import { useMemo } from 'react';

export function useQueryParams() {
  const location = useLocation(); // 현재 URL 정보 가져오기
  const navigate = useNavigate(); // URL을 변경할 수 있게 해주는 함수

  // 쿼리스트링을 쉽게 다루게 변환하기
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // URL 쿼리 파라미터 업데이트 함수
  const setParams = (newParams) => {
    const updated = new URLSearchParams(location.search);

    for (const key in newParams) {
      const value = newParams[key];
      if (value === undefined || value === null || value === '') {
        updated.delete(key); // 값이 없으면 삭제
      } else {
        updated.set(key, value); // 값이 있으면 설정
      }
    }

    // 주소를 새로 설정하기 (뒤로 가기 히스토리에 남지 않게 replace 옵션)
    navigate(`${location.pathname}?${updated.toString()}`, { replace: true });
  };

  return [params, setParams]; // 읽기용, 쓰기용으로 배열 반환
}
