import { useEffect, useState } from 'react';

// 현재 브라우저의 너비가 query와 일치하는지 여부를 true, false로 반환하는 커스텀 훅
const useMediaQuery = (query) => {
  // 첫 렌더시 반환된 MediaQueryList 객체를 초기값으로 가진 state 사용
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
    // matchMedia 함수는 MediaQueryList 객체를 반환하고,
    // matches 프로퍼티를 통해 전달된 query와 브라우저 너비의 일치 여부를
    // true, false 값으로 얻을 수 있음
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // 브라우저 너비가 변할때 마다 mediaQueryList에서 query의 matches 여부 저장
    mediaQueryList.addEventListener('change', handleChange);
    // 언마운트시 event listner 제거
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
