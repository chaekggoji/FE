import supabase from '@libs/supabase';

export const getPostListByType = (studyId, type) => {
  return supabase
    .from('posts')
    .select(
      `*,
       post_participants (
        user_id,
        is_writer,
        users (
          id,
          nickname,
          img_url
        )
      )
      `,
    )
    .eq('type', type)
    .eq('study_id', studyId)
    .order('created_at', { ascending: false }); // 최신 순 정렬
};
