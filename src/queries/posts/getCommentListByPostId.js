import supabase from '@libs/supabase';

export const getCommentListByPostId = async (postId, cursor) => {
  const query = supabase
    .from('comments')
    .select(
      `*,users (id,nickname,img_url)
      `,
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: false }); // 최신 순 정렬

  if (cursor) {
    query.lt('created_at', cursor);
  }

  query.limit(5);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
