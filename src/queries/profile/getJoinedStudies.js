import supabase from '@libs/supabase';

// 스터디 목록 조회 함수
export const getJoinedStudies = async (userId) => {
  try {
    // 현재 날짜를 YYYY-MM-DD 형식으로 가져옴, 목적: 스터디 종료일과 비교하여 진행 중인지 완료되었는지 상태를 판단하기 위함
    const currentDate = new Date().toISOString().split('T')[0];

    // 1단계: study_participants 테이블에서 해당 사용자의 스터디 ID 목록 조회
    // 단일 쿼리만 있는 함수에서는 data, error와 같이 간결하게 사용가능하지만, 여기에서는 여러 쿼리를 연속해서 수행하기 때문에 구체적인 변수명이 더 유용함
    const { data: userStudyIds, error: studyIdsError } = await supabase
      .from('study_participants') // 스터디 참여자 테이블 선택
      .select('study_id') // 스터디 ID만 선택
      .eq('user_id', userId); // 해당 유저가 참여한 레코드만 필터링

    // 조회 과정에서 에러가 발생한 경우 예외 처리
    if (studyIdsError) throw studyIdsError;

    // 데이터베이스 조회 결과가 null이거나 사용자가 참여한 스터디가 정말로 한 개도 없을 때 빈 배열 반환
    if (!userStudyIds || userStudyIds.length === 0) {
      return [];
    }

    // 참여 중인 스터디 ID 목록 추출
    const studyIds = userStudyIds.map((item) => item.study_id);

    // 2단계: 스터디 ID 목록을 이용해 studies 테이블에서 스터디 정보 조회
    const { data: studyDetails, error: studyDetailsError } = await supabase
      .from('studies')
      .select(
        `
        id,
        title,
        description,
        start_date,
        end_date,
        capacity,
        book_id,
        books (
          id,
          title,
          author
        )
      `,
      )
      .in('id', studyIds) // studyIds 배열에 포함된 id를 가진 스터디만 조회
      .order('created_at', { ascending: false }); // 최신 생성 순으로 정렬

    if (studyDetailsError) throw studyDetailsError;

    // 3단계: 각 스터디별 참여자 수를 개별적으로 조회 - group 메서드가 지원되지 않아 각 스터디별로 별도 쿼리 실행
    const memberCountMap = {};
    for (const studyId of studyIds) {
      const { count, error: countError } = await supabase
        .from('study_participants')
        .select('*', { count: 'exact', head: true })
        .eq('study_id', studyId);

      if (countError) throw countError;
      memberCountMap[studyId] = count || 0;
    }

    // 4단계: 스터디 데이터와 참여자 수를 합쳐서 최종 결과 만들기
    const studiesWithParticipants = studyDetails.map((study) => {
      // 스터디가 현재 진행 중인지 완료되었는지 판단 (스터디 종료일이 오늘 이후면 진행 중, 이전이면 완료)
      const isInProgress = new Date(study.end_date) >= new Date(currentDate);

      // 이 스터디의 참여자 수 찾기 (위에서 만든 맵에서 스터디 ID로 바로 접근), 참여자 정보가 없으면 0으로 기본값 설정
      const memberCount = memberCountMap[study.id] || 0;

      return {
        id: study.id,
        title: study.title,
        bookTitle: study.books.title,
        bookAuthor: study.books.author,
        startDate: study.start_date,
        endDate: study.end_date,
        participantCount: memberCount,
        capacity: study.capacity,
        status: isInProgress ? 'inProgress' : 'completed',
      };
    });

    // 모든 처리가 완료된 스터디 목록 반환
    return studiesWithParticipants;
  } catch (error) {
    // 어떤 단계에서든 발생한 에러를 잡아서 처리
    console.error('스터디 목록 조회 실패:', error);
    throw {
      status: error.code,
      message: error.message,
    };
  }
};
