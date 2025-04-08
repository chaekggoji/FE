import DropdownBox from '@components/common/DropdownBox';
import BoardTitle from '@components/modules/board/BoardTitle';
import PhraseItem from '@components/modules/phrase/PhraseItem';
import PhraseWrite from '@components/modules/phrase/PhraseWrite';
import useMediaQuery from '@hooks/useMediaQuery';
import { getPhraseList } from '@queries/phrases';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
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
  const cursorRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const md = useMediaQuery('(min-width: 768px)');

  // const { data, isLoading } = useQuery({
  //   queryKey: ['phrases', studyId],
  //   queryFn: () => {
  //     return getPhraseList(studyId);
  //   },
  //   select: (res) => res.data,
  //   staleTime: 1000 * 10,
  // });

  useEffect(() => {
    const fetchInitialPhrases = async () => {
      setIsLoading(true);
      const res = await getPhraseList(studyId);
      setPhrases(res.data);
      if (res.data.length > 0) {
        const last = res.data[res.data.length - 1];
        cursorRef.current = last.created_at; // 업데이트만, 리렌더 X
        console.log(cursorRef.current);
      }
      setIsLoading(false);
    };

    fetchInitialPhrases();
  }, [studyId]);

  const fetchMorePhrases = async () => {
    if (cursorRef.current === null) return;
    setIsLoading(true);

    const res = await getPhraseList(studyId, cursorRef.current);
    if (res.data.length > 0) {
      setPhrases((prev) => [...prev, ...res.data]);
      const last = res.data[res.data.length - 1];
      cursorRef.current = last.created_at;
    }
    setIsLoading(false);
  };

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
          phrases.map((phrase) => (
            <PhraseItem key={phrase.id} phraseData={phrase} />
          ))}
        <button onClick={fetchMorePhrases}>데이터 불러오기</button>
      </div>
    </div>
  );
};

export default Phrases;
