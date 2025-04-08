import DropdownBox from '@components/common/DropdownBox';
import BoardTitle from '@components/modules/board/BoardTitle';
import PhraseItem from '@components/modules/phrase/PhraseItem';
import PhraseWrite from '@components/modules/phrase/PhraseWrite';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { getPhraseList } from '@queries/phrases';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

// 리팩토링 목록
// - 정렬
// - 무한 스크롤

const options = [
  { name: '좋아요 많은 순', value: 'mostLiked' },
  { name: '페이지 순', value: 'pageAscending' },
  { name: '초기화', value: null },
];

const Phrases = () => {
  const { studyId } = useParams();
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });
  const md = useMediaQuery('(min-width: 768px)');

  // 🌀 무한 스크롤 관련 로직

  // 🌀 useInfiniteQuery를 사용해 데이터를 불러와서 캐싱하고,
  // 무한 스크롤 구현에 필요한 속성들(data, fetchNextPage 등)을 획득합니다.
  // 동작 방식
  // 1. queryFn에서 pageParam(초기값 null)을 전달해 데이터를 불러옵니다.
  // (❗데이터 패치 함수는 data를 리턴해야 해서 async await을 사용했습니다.)
  //
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['phrases', studyId],
    queryFn: async ({ pageParam = null }) => {
      return await getPhraseList(studyId, pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].created_at;
    },
    staleTime: 1000 * 10,
  });

  const handleIntersect = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const lastItemRef = useIntersectionObserver(handleIntersect);

  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={'구절 공유해요'} />
      <div className="flex items-center max-w-[1000px] mx-auto lg:px-10 md:px-8 px-6 h-12 relative">
        <DropdownBox
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={options}
          size={md ? 'medium' : 'small'}
        />
        <PhraseWrite />
      </div>
      <div className="max-w-[1000px] mx-auto lg:px-10 md:px-8 px-6 flex flex-col gap-4">
        {!isLoading &&
          data?.pages.map((page, i) => (
            <div key={i} className="flex flex-col gap-4">
              {page.map((phrase, i, pages) => (
                <PhraseItem
                  key={phrase.id}
                  phraseData={phrase}
                  ref={i === pages.length - 1 ? lastItemRef : null}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Phrases;
