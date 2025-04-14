import supabase from '@libs/supabase';

// studies에서 studies의 컬럼과,
// study_id를 가지고 있는 study_participants의 row와,
// study_id를 가지고 있는 books의 row를 가져온다
// study_participants 결과 row에서 userId와 일치하는 users row도 덤으로 가져와줌 (외부 키연결 시 자동)
// 결과가 하나만 있어야 함 (single)
export const getStudyById = (studyId) => {
  return supabase
    .from('studies')
    .select(`*,books(*)`)
    .eq('id', studyId)
    .single();
};
