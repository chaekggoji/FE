import supabase from '@libs/supabase';

export const deleteCommentById = (commentId) => {
  return supabase.from('comments').delete().eq('id', commentId);
};
