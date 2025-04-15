import supabase from '@libs/supabase';

// 사용자의 관심 카테고리를 가져오는 함수
export const getUserInterestCategories = async (userId) => {
  // user_interests 테이블에서 book_categories 테이블 조인하여 한 번에 카테고리 정보 가져오기
  // 왜? user_interests 테이블은 사용자(user_id)와 카테고리(category_id)간의 관계만 저장하고 있고, 실제 카테고리 이름은 book_categories 테이블에 있기 때문에
  const { data, error } = await supabase
    .from('user_interests')
    .select(
      `
      category_id,
      book_categories (
        id,
        title
      )
    `,
    )
    .eq('user_id', userId);

  if (error) throw error;

  // 결과가 없는 경우 처리 (나중에 제거해도 됨)
  // 참고: 회원가입 시 카테고리는 필수 선택이지만(최소 1개, 최대 3개),
  // 개발/테스트 환경에서는 카테고리가 없는 임시 사용자 데이터를 위해 기본값 제공
  if (!data.length) return ['카테고리 1', '카테고리 2', '카테고리 3'];

  // 카테고리 제목만 추출하여 반환
  return data.map((item) => item.book_categories.title);
};
