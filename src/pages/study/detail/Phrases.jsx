import DropdownBox from '@components/common/DropdownBox';
import BoardTitle from '@components/modules/board/BoardTitle';
import PhraseItem from '@components/modules/phrase/PhraseItem';
import PhraseWrite from '@components/modules/phrase/PhraseWrite';
import useMediaQuery from '@hooks/useMediaQuery';
import { useState } from 'react';

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

const options = [
  { name: '좋아요 많은 순', value: 'mostLiked' },
  { name: '페이지 순', value: 'pageAscending' },
  { name: '초기화', value: null },
];

const Phrases = () => {
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    value: null,
  });

  const md = useMediaQuery('(min-width: 768px)');

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
        {phrases.map((phrase) => (
          <PhraseItem key={phrase.id} phraseData={phrase} />
        ))}
      </div>
    </div>
  );
};

export default Phrases;
