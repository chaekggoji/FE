import Person from '@assets/icons/icon_no_profile_24.svg';
import Button from '@components/common/Button';
import BookItem from '@components/common/BookItem';
import { useState } from 'react';
import ProfileCategoryTag from '@components/pages/profile/ProfileCategoryTag';
import StudyCardList from '@components/pages/profile/StudyCardList';
import { Link } from 'react-router';
import BookModal from '@components/pages/profile/BookModal';

const ProfileHome = () => {
  const userData = {
    id: 1,
    name: '쓴비',
    introduction: '떼쓰기를 좋아하는 쓴비입니다 :)',
    categories: ['자기계발', '소설', 'IT'],
  };

  // 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState('studies');

  // 모달 상태 관리 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    // {
    //   id: 4,
    //   title: '행동하지 않으면 인생은 바뀌지 않는다',
    //   author: '브라이언 트레이시',
    // },
    // {
    //   id: 5,
    //   title: 'The Wild Robot #1 : The Wild Robot (미국판)',
    //   author: '피터 브라운',
    // },
    // {
    //   id: 6,
    //   title:
    //     "Tuesdays with Morrie: an Old Man, a Young Man, and Life's Greatest Lesson",
    //   author: '미치 앨봄 와르르르르르르르르르르르르르르르르르르르르르르',
    // },
  ];

  return (
    // 전체적인 레이아웃 wrapper
    <div className="lg:p-20 md:p-16 sm:p-10">
      {/* 프로필 하얀 배경 */}
      <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto p-10 bg-white rounded-2xl">
        {/* 이미지 및 간단한 프로필 */}
        <div className="flex items-center gap-2.5">
          {/* 이미지 */}
          <div className="aspect-square lg:w-36 md:w-28 sm:w-20">
            <img
              src={Person}
              alt="프로필 이미지"
              className="object-cover block"
            />
          </div>
          {/* 간단한 프로필 */}
          <div className="grow">
            <h1 className="lg:text-4xl">{userData.name} 님</h1>
            <p className="mt-2 lg:text-2xl text-gray-500">
              {userData.introduction}
            </p>
            <div className="-mx-1 mt-0.5 flex items-center gap-1.5 text-primary-400">
              {userData.categories.map((category) => (
                <ProfileCategoryTag key={category} text={category} />
              ))}
            </div>
          </div>
        </div>

        {/* 프로필 - 내 정보 수정, 로그아웃 버튼 */}
        <div className="flex justify-end gap-2.5">
          <Link to="/profile/1/edit">
            <Button>내 정보 수정</Button>
          </Link>
          <Link to="/">
            <Button type="CTA Lined">로그아웃</Button>
          </Link>
        </div>
      </div>

      {/* 스터디 / 도서 탭 메뉴 */}
      <div className="mt-10">
        <div className="flex items-center gap-2.5 w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto pl-5 text-center">
          <button
            className={`w-24 py-0.5 rounded-t-lg border-t-4 box-border text-xl cursor-pointer ${
              activeTab === 'studies'
                ? 'bg-white border-gray-100'
                : 'bg-gray-100  border-gray-200 text-gray-500'
            }`}
            onClick={() => setActiveTab('studies')}
          >
            스터디
          </button>
          <button
            className={`w-24 py-0.5 rounded-t-lg border-t-4 box-border text-xl cursor-pointer ${
              activeTab === 'books'
                ? 'bg-white  border-gray-100'
                : 'bg-gray-100  border-gray-200 text-gray-500'
            }`}
            onClick={() => setActiveTab('books')}
          >
            도서
          </button>
        </div>

        {activeTab === 'studies' ? (
          // 최근 스터디
          <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto py-5 px-10 bg-white rounded-xl flex flex-col gap-5">
            <h2 className="text-3xl text-center py-5">최근 스터디</h2>
            <StudyCardList limit={4} />
            <div className="self-end py-5">
              <Link to="/profile/1/studies">
                <Button>모두 보기</Button>
              </Link>
            </div>
          </div>
        ) : (
          // 최근 도서
          <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto py-5 px-10 bg-white rounded-xl flex flex-col gap-5">
            {/* 나의 독서 현황 - 디자인에 변동사항이 생길 수도 있을 것 같아 추후에 컴포넌트로 변경 예정 */}
            <div className="w-full border-gray-200 border-2 rounded-lg p-5 shadow-sm mt-10 mx-auto">
              <h3 className="text-3xl font-bold mb-4 pb-2 border-b border-gray-100">
                나의 도서 현황
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                <Link to="/profile/1/books">
                  <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-secondary-100 p-3 py-2.5 transition-all hover:bg-secondary-200 hover:shadow-md cursor-pointer">
                    전체
                    <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                      16
                    </span>
                  </button>
                </Link>
                <Link to="/profile/1/books">
                  <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-primary-100 p-3 py-2.5 transition-all hover:bg-primary-200 hover:shadow-md cursor-pointer">
                    진행중
                    <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                      4
                    </span>
                  </button>
                </Link>
                <Link to="/profile/1/books">
                  <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-gray-100 p-3 py-2.5 transition-all hover:bg-gray-200 hover:shadow-md cursor-pointer">
                    완료
                    <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                      12
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <h2 className="text-3xl text-center p-5">최근 도서</h2>
            {/* 도서 카드 */}
            <div className="flex flex-wrap justify-between gap-7.5">
              {booksList.map((book) => (
                <BookItem
                  key={book.id}
                  size="large"
                  title={book.title}
                  author={book.author}
                  thumbnail={book.thumbnail}
                  link={book.link}
                  onClick={() => handleOpenModal()} // 클릭 핸들러 추가
                ></BookItem>
              ))}
            </div>

            <BookModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />

            <div className="self-end py-5">
              <Link to="/profile/1/books">
                <Button>모두 보기</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHome;
