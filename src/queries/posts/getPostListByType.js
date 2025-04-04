import supabase from '@libs/supabase';

export const getPostListByType = (studyId, type, from, to, sortBy) => {
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
    .eq('study_id', studyId);

  if (sortBy) {
    if (sortBy === 'mostViewed') {
      console.log('1');
      query.order('views', { ascending: false });
    } else if (sortBy === 'mostCommented') {
      console.log('2');

      query.order('comment_count', { ascending: false });
    } else if (sortBy === 'recent') {
      console.log('3');

      query.order('recent_activity', { ascending: false });
    }
  } else {
    console.log('4');

    query.order('created_at', { ascending: false }); // default : 최신 순 정렬
  }

  if (typeof from === 'number' && typeof to === 'number') {
    query.range(from, to);
  }

  return query;
};
