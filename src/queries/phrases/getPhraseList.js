import supabase from '@libs/supabase';

export const getPhraseList = (studyId) => {
  return supabase
    .from('phrases')
    .select(
      `*,users (id,nickname,img_url)
      `,
    )
    .eq('study_id', studyId)
    .order('created_at', { ascending: false }); // 최신 순 정렬
};
