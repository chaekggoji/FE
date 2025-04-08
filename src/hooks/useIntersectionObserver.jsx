import { useEffect, useRef } from 'react';

const useIntersectionObserver = (onIntersect) => {
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    observerRef.current.observe(targetRef.current);
    return () => observerRef.current?.disconnect();
  }, [onIntersect]);

  return targetRef;
};

export default useIntersectionObserver;
