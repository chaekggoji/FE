import { useState } from 'react';
import ProfileHeader from '@components/pages/profile/ProfileHeader';
import ProfileTabs from '@components/pages/profile/ProfileTabs';
import ProfileStudySection from '@components/pages/profile/ProfileStudySection';
import ProfileBookSection from '@components/pages/profile/ProfileBookSection';
import useUserStore from '@store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@queries/profile/getUserInfo';
import { getUserInterestCategories } from '@queries/profile/getUserInterestCategories';
import WhiteSpinner from '@components/common/WhiteSpinner';
import SeverError from '@pages/SeverError';

const ProfileHome = () => {
  // 스토어에서 사용자 id만 가져오기
  const userId = useUserStore((state) => state.loggedInUser.id);

  // 사용자 기본 정보 조회 (닉네임, 소개, 이미지)
  // isError: 불리언 값으로 에러 존재 여부 확인 vs error: 실제 에러 객체
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ['userInfo', userId], // 쿼리 키 - 고유 식별자 역할
    queryFn: () => getUserInfo(userId), // 실행할 함수
    // 만약 getUserInfo에서 에러가 throw되면 react-query가 이 에러를 자동으로 잡아서 isError를 true로 만듦
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    onError: (error) => {
      // 디버깅용 - console.error('에러 발생:', error);

      // 에러 상태를 사용자에게 안내할 때 유용
      console.error(`[에러 코드: ${error.status}] ${error.message}`);
    },
  });

  // 사용자 관심 카테고리 조회
  const {
    data: userInterestCategories,
    isLoading: isUserInterestCategoriesLoading,
    error: userInterestCategoriesError,
  } = useQuery({
    queryKey: ['userInterestCategories', userId],
    queryFn: () => getUserInterestCategories(userId),
    enabled: !!userId,
    onError: (error) => {
      console.error(`[에러 코드: ${error.status}] ${error.message}`);
    },
  });

  // 로딩 상태 통합
  const isLoading = isUserInfoLoading || isUserInterestCategoriesLoading;

  // 에러 상태 통합
  const error = userInfoError || userInterestCategoriesError;
  const isError = !!error; // error: 원래 값, !!error: 명시적인 불리언 값 / 동일하게 작동하지만, 타입 변환의 명시성 때문에 !!를 사용함 (error를 그대로 사용해도 무방, 코드의 의도를 명확히 하고 싶을 때 사용)

  // 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState('studies');

  // 도서 목록 (임시 데이터)
  const booksList = [
    {
      id: 1,
      title: '소년이 온다',
      author: '한강',
    },
    {
      id: 2,
      title:
        '2025 큰별쌤 최태성의 별별한국사 한국사능력검정시험 심화(1,2,3급) 상',
      author: '최태성',
    },
    {
      id: 3,
      title: '어제보다 멍청해지기 전에',
      author: '필립 길버트 해머튼',
    },
  ];

  // 데이터 로딩 중일 때
  if (isLoading) {
    return <WhiteSpinner />;
  }

  // 에러 발생 시
  // TODO: 다른 에러(서버 에러 외)일 경우, 에러 유형별 토스트 알림으로 리팩토링 필요 (참고: https://supabase.com/docs/guides/storage/debugging/error-codes)
  if (isError) {
    if (error?.status >= 500 && error?.status < 600) {
      return <SeverError />;
    }
  }

  return (
    // 전체적인 레이아웃 wrapper
    <div className="lg:p-20 md:p-16 sm:p-10">
      <ProfileHeader
        user={{
          id: userId,
          nickname: userInfo.nickname,
          intro: userInfo.intro || '나를 표현하는 짧은 한 문장을 적어주세요😊',
          img_url: userInfo.img_url,
          categories: userInterestCategories,
        }}
      />

      {/* 스터디 / 도서 탭 메뉴 */}
      <div className="mt-10">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'studies' ? (
          <ProfileStudySection userId={userId} />
        ) : (
          <ProfileBookSection userId={userId} booksList={booksList} />
        )}
      </div>
    </div>
  );
};

export default ProfileHome;
