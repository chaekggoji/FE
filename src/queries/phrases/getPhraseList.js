import supabase from '@libs/supabase';

export const getPhraseList = async (studyId, cursor, sortBy) => {
  const query = supabase
    .from('phrases')
    .select(
      `*,
      users (id,nickname,img_url),
      likes(user_id)
      `,
    )
    .eq('study_id', studyId);

  if (sortBy) {
    if (sortBy === 'mostLiked') {
      query
        .order('like_count', { ascending: false })
        .order('created_at', { ascending: false });

      if (cursor) {
        const { like_count, created_at } = cursor;
        console.log(like_count, created_at);
        query.or(
          // eslint-disable-next-line camelcase
          `like_count.lt.${like_count},and(like_count.eq.${like_count},created_at.lt.${created_at})`,
        );
      }
    } // 최신 순 정렬
    else if (sortBy === 'pageAscending') {
      query
        .order('page', { ascending: true })
        .order('created_at', { ascending: false });

      if (cursor) {
        const { page, created_at } = cursor;
        query.or(
          // eslint-disable-next-line camelcase
          `page.gt.${page},and(page.eq.${page},created_at.lt.${created_at})`,
        );
      }
    }
  } else {
    query.order('created_at', { ascending: false }); // 최신 순 정렬

    if (cursor) {
      query.lt('created_at', cursor);
    }
  }

  query.limit(5);

  const { data, error } = await query;
  if (error) throw error;
  console.log(data);
  return data;
};
