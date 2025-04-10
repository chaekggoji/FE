import supabase from '@libs/supabase';

export const getPhraseList = async (studyId, cursor) => {

  const query = supabase
    .from('phrases')
    .select(
      `*,
      users (id,nickname,img_url),
      likes(user_id)
      `,
    )
    .eq('study_id', studyId)
    .order('created_at', { ascending: false }); // 최신 순 정렬

  if (cursor) {
    query.lt('created_at', cursor);
  }

  query.limit(5);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
