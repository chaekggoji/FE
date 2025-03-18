import { useEffect } from 'react';

const useOutsideClick = (targetRef, handler) => {
  useEffect(() => {
    // targetRef가 클릭된 노드를 포함하지 않으면 handler를 실행하는 함수
    const handleOutsideClick = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
};

export default useOutsideClick;
