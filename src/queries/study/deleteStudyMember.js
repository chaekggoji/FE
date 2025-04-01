import supabase from '@libs/supabase';

export const deleteStudyMember = (userId, studyId) => {
  return supabase
    .from('study_participants')
    .delete()
    .eq('user_id', userId)
    .eq('study_id', studyId)
    .neq('role', 'leader'); // leader는 삭제되지 않음
};
