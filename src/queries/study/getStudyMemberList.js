import supabase from '@libs/supabase';

export const getStudyMemberList = (studyId) => {
  return supabase
    .from('study_participants')
    .select('id, role, users(id, nickname, img_url)')
    .eq('study_id', studyId)
    .order('created_at', { ascending: true }); // 리더부터 보여주기 위함
};
