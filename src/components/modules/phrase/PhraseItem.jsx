import defaultProfile from '@assets/icons/icon_no_profile_24.svg';
import emptyHeartIcon from '@assets/icons/icon_heart_24.svg';
import filledHeartIcon from '@assets/icons/icon_heart_filled_24.svg';
import SmallDropdownBox from '@components/common/SmallDropdownBox';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const PhraseItem = ({ phraseData }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col pt-4 ring-1 ring-slate-500 rounded-2xl font-gowunbatang md:text-[1rem] text-sm">
      <div className="flex px-8 pb-2">
        <p>p.{phraseData.page}</p>
        <SmallDropdownBox className="ml-auto" />
      </div>
      <p className="px-8 pb-6">{phraseData.content}</p>
      <div className="flex items-center px-8 py-2 border-t-1 border-slate-500 bg-slate-100 rounded-b-2xl">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate(`/profile/${phraseData.users.id}`)}
        >
          <img
            src={
              phraseData.users?.img_url
                ? phraseData.users.img_url
                : defaultProfile
            }
            className="size-10 mr-2 rounded-full object-cover"
          />
          <p className="font-bold">{phraseData.users.nickname}</p>
        </div>
        <div className="flex ml-auto">
          <img
            src={isActive ? filledHeartIcon : emptyHeartIcon}
            className="mr-2 cursor-pointer"
            onClick={() => setIsActive((prev) => !prev)}
          />
          <p>{phraseData.likes}</p>
        </div>
      </div>
    </div>
  );
};

PhraseItem.propTypes = {
  phraseData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    users: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string,
      img_url: PropTypes.string,
    }),
    likes: PropTypes.number.isRequired,
  }),
};

export default PhraseItem;
