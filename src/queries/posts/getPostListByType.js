import supabase from '@libs/supabase';

export const getPostListByType = (studyId, type, from, to) => {
  const query = supabase
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
      { count: 'exact' },
    )
    .eq('type', type)
    .eq('study_id', studyId)
    .order('created_at', { ascending: false }); // 최신 순 정렬

  if (typeof from === 'number' && typeof to === 'number') {
    query.range(from, to);
  }

  return query;
};
