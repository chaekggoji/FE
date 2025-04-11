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
        const { likeCount, createdAt } = cursor;
        query.or(
          `like_count.lt.${likeCount},and(like_count.eq.${likeCount},created_at.lt.${createdAt})`,
        );
      }
    } // 최신 순 정렬
    else if (sortBy === 'pageAscending') {
      query
        .order('page', { ascending: true })
        .order('created_at', { ascending: false });

      if (cursor) {
        const { page, createdAt } = cursor;
        query.or(
          `page.gt.${page},and(page.eq.${page},created_at.lt.${createdAt})`,
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
