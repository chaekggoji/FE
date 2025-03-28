import DropdownBox from '@components/common/DropdownBox';
import BoardTitle from '@components/modules/board/BoardTitle';
import PhraseItem from '@components/modules/phrase/PhraseItem';
import PhraseWrite from '@components/modules/phrase/PhraseWrite';
import useMediaQuery from '@hooks/useMediaQuery';
import { getPhraseList } from '@queries/phrases/getPhraseList';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

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

  const { data, isLoading } = useQuery({
    queryKey: ['phrases', studyId],
    queryFn: () => {
      return getPhraseList(studyId);
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

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
        {data.map((phrase) => (
          <PhraseItem key={phrase.id} phraseData={phrase} />
        ))}
      </div>
    </div>
  );
};

export default Phrases;
