import { useEffect, useRef } from 'react';

const useIntersectionObserver = (onIntersect) => {
  const observerRef = useRef(null); // 관찰 도구
  const targetRef = useRef(null); // 관찰할 DOM 노드

  useEffect(() => {
    // 기존의 관찰 설정정을 초기화합니다.
    if (!targetRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    // 관찰 도구(Intersection Observer 인스턴스)를 설정합니다.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 등록된 entries 중 첫 번째 요소가 화면에 보일 때 onInteresect이 실행됩니다.
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      // entry가 화면에 100% 모두 나타났을 때 isIntersecting이 ture로 바뀝니다.
      { threshold: 1.0 },
    );

    // 설정된 관찰 도구에 targetRef를 등록합니다.
    observerRef.current.observe(targetRef.current);
    // 메모리 누수 방지를 위해 언마운트시 등록을 해제합니다.
    return () => observerRef.current?.disconnect();
  }, [onIntersect]);

  return targetRef;
};

export default useIntersectionObserver;
