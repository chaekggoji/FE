// 1. 라이브러리
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

// 2. 내부 컴포넌트
import Button from '@components/common/Button';
import BookItem from '@components/common/BookItem';
import Pagination from '@components/common/Pagination';
import PhraseItem from '@components/modules/phrase/PhraseItem';

// 3. 아이콘, 이미지
import close from '@assets/icons/icon_x_24.svg';

// isOpen: 모달 표시 여부(불리언), onRequestClose: 모달을 닫을 때 호출되는 함수
const BookModal = ({ isOpen, onRequestClose }) => {
  // 현재 화면 너비 상태 관리(반응형)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 윈도우 크기 변경 감지 및 상태 업데이트
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    // 창 크기 변경 감지 시작
    window.addEventListener('resize', handleResize);
    // 클린업 함수: 컴포넌트가 사라질 때 실행되는 정리 함수 (이벤트 제거)
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 브레이크포인트 설정
  const TABLET_BREAKPOINT = 768;
  const MOBILE_BREAKPOINT = 590; // 텍스트가 두 줄이 되는 시점으로 조정 (피그마 시안과 다름)

  // 화면 크기 체크해서 모바일/태블릿 여부를 알려주는 변수
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;
  const isTablet =
    windowWidth <= TABLET_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT;

  // 화면 크기에 따른 모달 스타일 동적 계산
  const getModalStyles = () => {
    return {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        width: isMobile ? '95%' : isTablet ? '90%' : '45rem',
        minWidth: '20rem',
        maxWidth: '45rem',
        padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
        borderRadius: '1.25rem',
        backgroundColor: '#f5f5f5',
        maxHeight: isMobile ? '90vh' : '80vh',
        overflow: 'auto',
      },
    };
  };

  // 더미 데이터
  const phrases = [
    {
      id: 1,
      page: 142,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi totam distinctio, incidunt aliquam repellat, quae iure autem quam vero quibusdam laudantium hic! Reiciendis, explicabo labore doloremque et illo ad!',
      user: {
        id: 1,
        nickname: '유저1',
      },
    },
    {
      id: 2,
      page: 152,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi totam distinctio, incidunt aliquam repellat, quae iure autem quam vero quibusdam laudantium hic! Reiciendis, explicabo labore doloremque et illo ad!',
      user: {
        id: 2,
        nickname: '유저2',
      },
    },
    {
      id: 3,
      page: 162,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi totam distinctio, incidunt aliquam repellat, quae iure autem quam vero quibusdam laudantium hic! Reiciendis, explicabo labore doloremque et illo ad!',
      user: {
        id: 3,
        nickname: '유저3',
      },
    },
  ];

  // BookItem 크기 결정 - 태블릿 이하는 medium, 그 이상은 large
  const bookItemSize = () => {
    if (isTablet) return 'medium';
    return 'large';
  };

  // 데스크탑이 아닌 경우의 텍스트 크기 (태블릿과 모바일 동일)
  const nonDesktopTextSize = {
    bookInfoTitle: 'text-3xl', // 도서 정보
    booktitle: 'text-2xl', // 책 제목
    bookcontent: 'text-xl', // 책 내용
    phraseTitle: 'text-3xl', // 구절 제목
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={getModalStyles()}
      contentLabel="도서 정보 모달창"
    >
      <button
        onClick={onRequestClose}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: '#D9D9D9',
          padding: isMobile ? '0.375rem' : '0.5rem',
          cursor: 'pointer',
          borderRadius: '0.5rem',
          zIndex: 10,
        }}
      >
        <img
          src={close}
          alt="닫기 아이콘"
          style={{
            width: isMobile ? '18px' : '24px',
            height: isMobile ? '18px' : '24px',
          }}
        />
      </button>

      {/* 도서 정보 헤더 - 모바일과 태블릿이 같은 글씨 크기 */}
      <h2
        className={`${
          !isMobile && !isTablet ? 'text-4xl' : nonDesktopTextSize.bookInfoTitle
        } text-center my-4`}
      >
        {isMobile ? '어린왕자' : '도서 정보'}
      </h2>

      {/* 책, 스터디 이동 - 모바일에서는 세로 배치, 그 외에서는 가로 배치 */}
      {!isMobile ? (
        // 데스크톱/태블릿 레이아웃
        <div className="flex flex-row gap-6">
          <div>
            <BookItem size={bookItemSize()} showCaption={false} />
          </div>
          <div className="flex flex-col gap-3 justify-end w-full">
            <h3
              className={`${!isTablet ? 'text-3xl' : nonDesktopTextSize.booktitle} line-clamp-2 overflow-hidden`}
            >
              어린 왕자
            </h3>
            <p
              className={`${!isTablet ? 'text-2xl' : nonDesktopTextSize.bookcontent} line-clamp-2 overflow-hidden`}
            >
              앙투안 드 생텍쥐페리 저자(글) · 김수영 번역
            </p>
            <p
              className={`${!isTablet ? 'text-2xl' : nonDesktopTextSize.bookcontent} line-clamp-1 overflow-hidden`}
            >
              코너스톤
            </p>
            <Link to="/study/1/home">
              <Button type="CTA Lined" size="large" className="w-full">
                스터디 이동
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        // 모바일 레이아웃
        <div className="flex flex-col items-end text-right">
          <p
            className={`${nonDesktopTextSize.bookcontent} line-clamp-1 overflow-hidden w-full`}
          >
            생텍쥐페리 지음(프) · 김수영 번역
          </p>
          <p
            className={`${nonDesktopTextSize.bookcontent} line-clamp-1 overflow-hidden w-full`}
          >
            코너스톤 · 2020년 09월 22일
          </p>
        </div>
      )}

      {/* 다시 읽고 싶은 구절 */}
      <div className="bg-primary-200 p-5 mt-6 rounded-xl">
        <h3
          className={`${
            !isMobile && !isTablet
              ? 'text-3xl' // 데스크탑에서는 text-3xl로 변경
              : nonDesktopTextSize.phraseTitle // 태블릿/모바일에서는 text-2xl로 변경
          } text-white mb-5`}
        >
          다시 읽고 싶은 구절
        </h3>
        <div className="flex flex-col gap-5">
          {phrases.map((phrase) => (
            <PhraseItem key={phrase.id} phraseData={phrase} />
          ))}
          <div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* 모바일에서는 스터디 이동 버튼이 하단에 위치 */}
      {isMobile && (
        <div className="mt-6">
          <Link to="/study/1/home">
            <Button type="CTA Lined" size="large" className="w-full">
              스터디 이동
            </Button>
          </Link>
        </div>
      )}
    </Modal>
  );
};

// TODO: API 연동 시 데이터 추가 필요
BookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 모달 표시 여부
  onRequestClose: PropTypes.func.isRequired, // 모달을 닫을 때 호출되는 함수
};

export default BookModal;
