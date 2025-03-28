import supabase from '@libs/supabase';

export const getCommentListByPostId = (postId) => {
  return supabase
    .from('comments')
    .select(
      `*,users (id,nickname,img_url)
      `,
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: false }); // 최신 순 정렬
};
