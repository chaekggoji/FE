import Button from '@components/common/Button';
import { useState } from 'react';
import heart from '@assets/icons/icon_heart_24.svg';
import heartFilled from '@assets/icons/icon_heart_filled_24.svg';
import BookItem from '@components/common/BookItem';

const Test = () => {
  const [isCTAActive, setIsCTAActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const testBookList = [
    {
      title: '다슬이가 괜찮을까요?',
      author: '김용희',
      thumbnail:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3691137',
      url: 'https://search.daum.net/search?w=bookpage&bookId=3691137&q=%EB%8B%A4%EC%8A%AC%EC%9D%B4%EA%B0%80+%EA%B4%9C%EC%B0%AE%EC%9D%84%EA%B9%8C%EC%9A%94%3F',
    },
    {
      title: '은지와 푹신이',
      author: '하야시 아키코',
      thumbnail:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F975283%3Ftimestamp%3D20231129160657',
      url: 'https://search.daum.net/search?w=bookpage&bookId=975283&q=%EC%9D%80%EC%A7%80%EC%99%80+%ED%91%B9%EC%8B%A0%EC%9D%B4',
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <h1 className="text-lg md:text-base sm:text-sm">Outlet 영역 테스트</h1>
      <p className="text-gray-600">푸터는 항상 브라우저 하단에 고정됩니다</p>

      {/* 버튼 테스트 */}
      <div className="flex flex-col gap-4 items-center">
        {/* CTA 활성/비활성 테스트 */}
        <Button
          size="medium"
          type={isCTAActive ? 'CTA Active' : 'CTA Abled'}
          onClick={() => setIsCTAActive((prev) => !prev)}
        >
          CTA Abled 버튼 (medium)
        </Button>

        {/* 삭제 버튼 활성/비활성 테스트 */}
        <Button
          size="large"
          type={isDeleteActive ? 'CTA Delete Active' : 'CTA Delete'}
          onClick={() => setIsDeleteActive((prev) => !prev)}
        >
          CTA Delete 버튼 (large)
        </Button>

        {/* 비활성화 버튼 */}
        <Button size="small" type="CTA Disabled">
          CTA Disabled 버튼 (small)
        </Button>

        {/* 라인 버튼 */}
        <Button size="small" type="CTA Lined">
          CTA Lined 버튼 (small)
        </Button>
      </div>

      {/* 아이콘 테스트 */}
      <div className="flex gap-4 mt-5">
        <img src={heart} alt="빈 하트" className="w-6 h-6" />
        <img src={heartFilled} alt="채워진 하트" className="w-6 h-6" />
      </div>

      {/* BookItem 컴포넌트 테스트 */}
      <BookItem
        size="large"
        title={testBookList[0].title}
        author={testBookList[0].author}
        thumbnail={testBookList[0].thumbnail}
        link={testBookList[0].url}
      />
      <BookItem
        size="medium"
        title={testBookList[1].title}
        author={testBookList[1].author}
        thumbnail={testBookList[1].thumbnail}
        link={testBookList[1].url}
      />
    </div>
  );
};

export default Test;
