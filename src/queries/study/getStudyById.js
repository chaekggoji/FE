import supabase from '@libs/supabase';

// studies에서 studies의 컬럼과,
// study_id를 가지고 있는 books의 row를 가져온다
// 결과가 하나만 있어야 함 (single)
export const getStudyById = (studyId) => {
  return supabase
    .from('studies')
    .select(`*,books(*)`)
    .eq('id', studyId)
    .single();
};
