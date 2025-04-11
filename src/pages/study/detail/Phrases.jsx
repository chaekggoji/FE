import DropdownBox from '@components/common/DropdownBox';
import BoardTitle from '@components/modules/board/BoardTitle';
import PhraseItem from '@components/modules/phrase/PhraseItem';
import PhraseWrite from '@components/modules/phrase/PhraseWrite';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { getPhraseList } from '@queries/phrases';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// 리팩토링 목록
// - 정렬
// - 무한 스크롤 ✅

const options = [
  { name: '좋아요 많은 순', value: 'mostLiked' },
  { name: '페이지 순', value: 'pageAscending' },
  { name: '초기화', value: null },
];

const Phrases = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const md = useMediaQuery('(min-width: 768px)');

  const getSortOptionFromURL = () => {
    const params = new URLSearchParams(location.search);
    const value = params.get('sortBy');
    return (
      options.find((option) => option.value === value) || {
        name: '정렬 기준',
        value: '',
      }
    );
  };

  const [sortOption, setSortOption] = useState(getSortOptionFromURL());

  const handleSortOptionChange = (sortOption) => {
    setSortOption(sortOption);
    navigate(`?sortBy=${sortOption.value}`);
  };

  // 🌀 무한 스크롤 관련 로직

  // 🌀 useInfiniteQuery를 사용

  // 동작 방식
  // 1. 첫 렌더링
  // 1) pageParam(cursor)이 null인 상태로 데이터 패치 함수를 실행합니다.
  // 2) getPhraseList는 설정된 limit에 따라 5개의 데이터를 전달합니다.
  // (❗데이터 패치 함수는 data를 리턴해야 해서 async await을 사용했습니다.)

  // 2. fetchNextPage 실행
  // 1) pageParam이 getNextPageParam에 의해 페이지 마지막 데이터의 created_at 값으로 업데이트됩니다.
  // 2) getPhraseList로 pageParam이 전달되며 이전 cursor 기준으로 다음 5개의 데이터가 불러와집니다.
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['phrases', studyId, sortOption.value],
    queryFn: async ({ pageParam = null }) => {
      return await getPhraseList(studyId, pageParam, sortOption.value);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;

      const lastItem = lastPage[lastPage.length - 1];
      if (sortOption.value === 'mostLiked') {
        return {
          likeCount: lastItem.like_count,
          createdAt: lastItem.created_at,
        };
      } else if (sortOption.value === 'pageAscending') {
        return {
          page: lastItem.page,
          createdAt: lastItem.created_at,
        };
      } else {
        return lastItem.created_at;
      }
    },
    staleTime: 1000 * 10,
  });

  // 🌀 화면에 lastItemRef가 보여졌을 때 실행되는 함수
  const handleIntersect = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  // 🌀 커스텀 훅 안에서 선언된 관찰 대상(targetRef)를 바깥에서 지정합니다.
  const lastItemRef = useIntersectionObserver(handleIntersect);

  // 🌀 페이징 처리된 데이터 구조를 확인해 보세요
  // console.log(data);
  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={'구절 공유해요'} />
      <div className="flex items-center max-w-[1000px] mx-auto lg:px-10 md:px-8 px-6 h-12 relative">
        <DropdownBox
          selectedOption={sortOption}
          options={options}
          onChange={handleSortOptionChange}
          size={md ? 'medium' : 'small'}
        />
        <PhraseWrite />
      </div>
      <div className="max-w-[1000px] mx-auto lg:px-10 md:px-8 px-6 flex flex-col gap-4">
        {/* 🌀 페이징 처리된 데이터 구조에 맞게 map */}
        {!isLoading &&
          data?.pages.map((page, i) => (
            <div key={i} className="flex flex-col gap-4">
              {page.map((phrase, i, pages) => (
                //🌀 각 페이지의 마지막 데이터를 관찰 대상으로 지정
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
