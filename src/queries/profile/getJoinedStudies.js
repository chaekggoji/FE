import supabase from '@libs/supabase';

// 스터디 목록 조회 함수
export const getJoinedStudies = async (userId) => {
  try {
    // 현재 날짜를 YYYY-MM-DD 형식으로 가져옴, 목적: 스터디 종료일과 비교하여 진행 중인지 완료되었는지 상태를 판단하기 위함
    const currentDate = new Date().toISOString().split('T')[0];

    // 1단계: study_participants 테이블에서 해당 사용자의 스터디 ID 목록 조회
    // 단일 쿼리만 있는 함수에서는 data, error와 같이 간결하게 사용가능하지만, 여기에서는 여러 쿼리를 연속해서 수행하기 때문에 구체적인 변수명이 더 유용함
    const { data: participations, error: participationsError } = await supabase
      .from('study_participants') // 스터디 참여자 테이블 선택
      .select('study_id') // 스터디 ID만 선택
      .eq('user_id', userId); // 해당 유저가 참여한 레코드만 필터링

    // 조회 과정에서 에러가 발생한 경우 예외 처리
    if (participationsError) throw participationsError;

    // 데이터베이스 조회 결과가 null이거나 사용자가 참여한 스터디가 정말로 한 개도 없을 때 빈 배열 반환
    if (!participations || participations.length === 0) {
      return [];
    }

    // 참여 중인 스터디 ID 목록 추출
    const studyIds = participations.map((item) => item.study_id);

    // 2단계: 스터디 ID 목록을 이용해 studies 테이블에서 스터디 정보 조회
    const { data: studiesData, error: studiesError } = await supabase
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
        books ( // 중첩 조회: 스터디와 연결된 책 정보도 함께 가져옴
          id,
          title,
          author
        )
      `,
      )
      .in('id', studyIds) // studyIds 배열에 포함된 id를 가진 스터디만 조회
      .order('created_at', { ascending: false }); // 최신 생성 순으로 정렬

    if (studiesError) throw studiesError;

    // 3단계: 각 스터디별 참여자 수 조회
    // studiesData는 사용자가 참여한 모든 스터디 정보를 담고 있는 배열, 각 스터디마다 참여자 수를 따로 조회해야 함, Promise.all로 병렬로 처리하기(= 동시에 시작)
    // Promiese.all방식으로 하게 되면 스터디 수가 많아지면 성능 문제가 생길 수 있음 -> group by로 한 번에 모아서 조회하는 것으로 변경하기
    const studiesWithParticipants = await Promise.all(
      studiesData.map(async (study) => {
        // 해당 스터디의 참여자 수 조회
        // head: true는 실제 데이터는 필요 없고 개수만 필요할 때 사용
        const { count, error: countError } = await supabase
          .from('study_participants')
          .select('id', { count: 'exact', head: true }) // count: 'exact'로 총 개수 조회(exact: 쿼리 결과의 총 개수를 계산해 달라는 요청)
          .eq('study_id', study.id); // 현재 스터디 ID와 일치하는 참여자만 카운트 (실제 데이터는 반환하지 말고 count만 반환해 달라는 요청)

        // 참여자 수 조회 과정에서 에러가 발생한 경우 예외 처리
        if (countError) throw countError;

        // 현재 날짜와 종료일 비교하여 스터디 상태 결정
        const isInProgress = new Date(study.end_date) >= new Date(currentDate);

        // 필요한 정보만 추출하고 가공하여 프론트엔드에서 사용하기 좋은 형태로 변환
        return {
          id: study.id,
          title: study.title,
          bookTitle: study.books?.title || '제목 없음', // 책 정보가 없을 경우 기본값 제공
          bookAuthor: study.books?.author || '작가 미상', // 저자 정보가 없을 경우 기본값 제공
          startDate: study.start_date, // 시작일
          endDate: study.end_date, // 종료일
          participantCount: count || 0, // 참여자 수 (없으면 0)
          capacity: study.capacity, // 최대 참여 인원
          status: isInProgress ? 'inProgress' : 'completed', // 스터디 상태 (진행 중/완료)
        };
      }),
    );

    // 모든 처리가 완료된 스터디 목록 반환
    return studiesWithParticipants;
  } catch (error) {
    // 어떤 단계에서든 발생한 에러를 잡아서 처리
    console.error('스터디 목록 조회 실패:', error); // 디버깅을 위한 로그 출력
    throw {
      status: error.code || 500, // 에러 코드가 있으면 사용, 없으면 500(서버 오류)
      message: error.message || '스터디 목록을 가져오는데 실패했습니다.', // 사용자 친화적 메시지
    };
  }
};
