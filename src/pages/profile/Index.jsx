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

const ProfileHome = () => {
  // 스토어에서 사용자 id만 가져오기
  const userId = useUserStore((state) => state.loggedInUser.id);

  // 사용자 기본 정보 조회 (닉네임, 소개, 이미지)
  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery({
    queryKey: ['userInfo', userId], // 쿼리 키 - 고유 식별자 역할
    queryFn: () => getUserInfo(userId), // 실행할 함수
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });

  // 사용자 관심 카테고리 조회
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['userCategories', userId],
    queryFn: () => getUserInterestCategories(userId),
    enabled: !!userId,
  });

  // 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState('studies');

  // 로딩 상태 확인
  const isLoading = isUserInfoLoading || isCategoriesLoading;

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
  // if(isError){DataError 페이지를 만들기}

  return (
    // 전체적인 레이아웃 wrapper
    <div className="lg:p-20 md:p-16 sm:p-10">
      <ProfileHeader
        user={{
          id: userId,
          nickname: userInfo.nickname,
          intro: userInfo.intro || '나를 표현하는 짧은 한 문장을 적어주세요😊',
          img_url: userInfo.img_url,
          categories: categories,
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
