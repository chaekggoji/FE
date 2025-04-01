import defaultProfile from '@assets/icons/icon_no_profile_24.svg';
import emptyHeartIcon from '@assets/icons/icon_heart_24.svg';
import filledHeartIcon from '@assets/icons/icon_heart_filled_24.svg';
import SmallDropdownBox from '@components/common/SmallDropdownBox';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePhrase } from '@queries/phrases/deletePhrase';
import supabase from '@libs/supabase';
import useUserStore from '@store/useUserStore';

// 리팩토링 목록
// - 좋아요 광클 했을 때 문제 발생 해결

const PhraseItem = ({ phraseData }) => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const queryClient = useQueryClient();
  const { studyId } = useParams();
  const navigate = useNavigate();
  const isLikedByMe = phraseData.likes?.some(
    (like) => like.user_id === loggedInUserId,
  );
  const [isActive, setIsActive] = useState(isLikedByMe);

  const mutation = useMutation({
    mutationFn: ({ phraseId }) => {
      return deletePhrase(phraseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['phrases', studyId]);
      window.alert('구절이 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('구절 삭제 중 오류가 발생했습니다.');
    },
  });

  const handleDelete = (phraseId) => {
    mutation.mutate({ phraseId });
  };

  const handleToggleLike = async () => {
    const { error } = await supabase.rpc('toggle_like', {
      p_user_id: loggedInUserId,
      p_phrase_id: phraseData.id,
    });

    if (error) {
      console.error('좋아요 토글 실패:', error);
      return;
    }
    queryClient.invalidateQueries(['phrases', studyId]);
    setIsActive((prev) => !prev);
  };

  return (
    <div className="flex flex-col pt-4 ring-1 ring-slate-500 rounded-2xl font-gowunbatang md:text-[1rem] text-sm">
      <div className="flex px-8 pb-2">
        <p>p.{phraseData.page}</p>
        {loggedInUserId === phraseData.user_id ? (
          <SmallDropdownBox
            onDelete={() => handleDelete(phraseData.id)}
            className="ml-auto"
          />
        ) : null}
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
            onClick={handleToggleLike}
          />
          <p>{phraseData.likes.length}</p>
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
    user_id: PropTypes.number.isRequired,
    users: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string,
      img_url: PropTypes.string,
    }),
    likes: PropTypes.number.isRequired,
  }),
};

export default PhraseItem;
