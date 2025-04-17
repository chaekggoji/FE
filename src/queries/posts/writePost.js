import supabase from '@libs/supabase';

export const writePost = (
  studyId,
  userId,
  type,
  title,
  content,
  imgUrlList,
) => {
  return supabase.from('posts').insert([
    {
      user_id: userId,
      study_id: studyId,
      type,
      title,
      content,
      img_url: imgUrlList,
    },
  ]);
};
