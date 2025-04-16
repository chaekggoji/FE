import supabase from '@libs/supabase';

// 사용자 프로필 정보를 가져오는 함수
export const getUserInfo = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('nickname,intro, img_url') // 가져올 필드 지정
    .eq('id', userId) // id가 userId와 일치하는 행 검색 (=특정 사용자 찾는 조건)
    .single(); // 결과를 배열이 아닌 단일 객체로 반환

  if (error) throw error; // 에러가 발생하면 그 에러를 함수를 호출한 쪽(여기서는 React Query)로 보내는 것
  return data; // 가져온 사용자 정보를 반환함
};
