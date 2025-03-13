// 리액트, 라이브러리
import { useState } from 'react';
import PropTypes from 'prop-types';
// 외부 패키지
// 이미지
import bookClubImg from '@assets/bookClub.svg';
import introImg from '@assets/intro.svg';
import debateImg from '@assets/debate.svg';
import arrowImg from '@assets/icons/icon_arrow_right_24.svg';
import { useNavigate } from 'react-router';

// ✨ 6개의 섹션 생성 (첫 번째 요소는 value지만 사용하지 않기에 '_'로 감춤)
const sections = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `섹션 ${index + 1}`,
  title: `섹션 ${index + 1}`,
}));

// ❓ FAQ 데이터 배열 (질문 & 답변)
const faqDataList = [
  {
    question: 'Q. 스터디 인원은 몇 명인가요?',
    answer:
      'A. 스터디 인원은 최소 1명부터 최대 8명까지 가능합니다. 추후 인원이 늘어난다면 최대 인원이 수정될 수 있으며, 답변 길이를 길게 했을 때 디자인이 어떻게 바뀌는지 체크 중입니다 오바. 21억명이면 스터디 최대 인원은 어디까지 올라가는 거예요?',
  },
  {
    question: 'Q. 흔한 질문이 뭐가 있을까요?',
    answer: 'A. NOT NULL 믿었던 만큼 내 친구도 믿었기에',
  },
  {
    question: 'Q. 오늘 점심은 뭐 먹을까요?',
    answer: 'A. 핀볼 게임으로 정해보아용.',
  },
];

// 🎨 FAQ(질문 & 답변) 하나를 나타내는 UI
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className=" bg-[#FFF5E4] rounded-lg shadow-xl text-left text-[3rem] pl-8 pr-8">
    {/* 질문 부분 */}
    <button
      className="w-full p-6 text-[2rem] flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      {question}
      <span className="text-[2rem] text-primary-300">{isOpen ? '▲' : '▼'}</span>
    </button>

    {/* 답변 (isOpen이 true일 때만 표시) */}
    {isOpen && (
      <div className="p-6 text-[1.8rem] text-primary-400 border-t-2 border-primary-200/50">
        {answer}
      </div>
    )}
  </div>
);

// FAQItem의 PropTypes 정의
FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// ❓ 스터디 역할별 진행 방법
const StudyStep = ({ number, text }) => (
  <div className="flex items-center gap-4">
    {/* 순서 번호 */}
    <span className="w-[3rem] h-[3rem] flex items-center justify-center bg-primary-300 text-[#FFF5E4] rounded-full text-[2rem] ml-2">
      {number}
    </span>
    {/* 순서 설명 */}
    <p className="text-[2rem] pl-4">{text}</p>
  </div>
);

// StudyStep의 PropTypes 정의
StudyStep.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const Guide = () => {
  const [activeTab, setActiveTab] = useState(1); // 스터디 역할 탭(디폴트: 스터디 멤버)
  const [openFaq, setOpenFaq] = useState(null); // 현재 열려 있는 FAQ 항목의 index (null이면 모두 닫힘)
  const navigate = useNavigate(); // 페이지 이동

  // FAQ 토글 함수
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index); // 이미 열린 FAQ 클릭 시 닫히고, 새로운 항목 클릭 시 해당 항목이 열림
  };

  // 스터디 진행 단계 데이터
  const studySteps = {
    // 스터디 멤버일 때
    1: [
      '어떤 스터디가 있는지 구경한다.',
      '책 이름을 검색해본다.',
      '원하는 스터디에 가입하고 책을 읽는다!',
    ],
    // 스터디 리더일 때
    2: [
      '스터디 생성을 클릭한다.',
      '진행할 도서와 규칙 등을 기입한다.',
      '함께 책을 즐길 멤버를 모집한다!',
    ],
  };

  return (
    // ❌ 음수 마진으로 좌우 패딩 제거
    <div className="font-ownglyph text-center -mx-10 md:-mx-8 sm:-mx-6">
      {/* index의 홀짝에 따라 배경색 설정 */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`w-full min-h-[800px] flex justify-center items-center
            ${index % 2 === 0 ? 'bg-primary-200' : 'bg-white'}`}
        >
          {/* 컨텐츠 감싸는 div (너비 60%, 중앙 정렬) */}
          <div className="w-[60vw] max-w-[1200px] flex flex-col justify-between items-center h-[70%]">
            {index === 0 ? (
              // 1️⃣ 대문 섹션
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 텍스트 영역 */}
                <div className="w-[75%] flex flex-col text-left">
                  <h1 className="text-white [-webkit-text-stroke:2px_black] text-[5rem] mb-8">
                    우리들의 독서 공간
                  </h1>
                  <p className="text-[2rem]">
                    독서 좋아하는 사람들 여기여기 붙어라 👍🏻
                  </p>
                </div>
                {/* 오른쪽 이미지 */}
                <div className="w-[25%] flex justify-end">
                  <img
                    src={bookClubImg}
                    alt="Book Club Img"
                    className="w-[20rem] object-contain"
                  />
                </div>
              </div>
            ) : index === 1 ? (
              // 2️⃣ '책꼬지' 설명 섹션
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 이미지 */}
                <div className="w-[25%] flex justify-start">
                  <img
                    src={introImg}
                    alt="Intro Icon"
                    className="w-[20rem] object-contain"
                  />
                </div>
                {/* 오른쪽 텍스트 영역 */}
                <div className="w-[75%] flex flex-col text-right">
                  <h1 className="[-webkit-text-stroke:2px_black] text-[5rem] text-primary-200 mb-8">
                    책꼬지가 뭔가요?
                  </h1>
                  <p className="text-[2rem] mb-4 pl-8">
                    ‘책꼬지’는 책과 모꼬지의 합성어로, 독서 모임을 뜻하는
                    말이에요.
                  </p>
                  <p className="text-[1.5rem] text-gray-500">
                    *책꼬지하다: 독서 스터디를 위해 모이다.
                  </p>
                </div>
              </div>
            ) : index === 2 ? (
              // 3️⃣ 활용법 섹션
              <>
                <h1 className="text-white [-webkit-text-stroke:2px_black] text-[5rem] mt-16 mb-8">
                  <span className="text-secondary-200">책꼬지</span> 활용하는 법
                </h1>
                {/* 탭 영역 */}
                <div className="flex w-full max-w-[1200px] h-[40%]rounded-t-lg">
                  <button
                    className={`flex-1 py-4 rounded-t-2xl cursor-pointer ${activeTab === 1 ? 'bg-[#FFF5E4]' : 'bg-primary-300'}`}
                    onClick={() => setActiveTab(1)}
                  >
                    <h2 className="text-[2.5rem]">📚 스터디에 참여할래요!</h2>
                  </button>
                  <button
                    className={`flex-1 py-4 rounded-t-2xl cursor-pointer ${activeTab === 2 ? 'bg-[#FFF5E4]' : 'bg-primary-300'}`}
                    onClick={() => setActiveTab(2)}
                  >
                    <h2 className="text-[2.5rem]">
                      🦁 스터디를 만들고 싶어요!
                    </h2>
                  </button>
                </div>

                {/* 진행 순서 섹션 */}
                <div className="w-full max-w-[1200px] h-[50%] min-h-[400px] bg-[#FFF5E4] p-8 rounded-b-lg text-left flex flex-col justify-center gap-16 pl-10 mb-16">
                  {studySteps[activeTab]?.map((text, index) => (
                    <StudyStep key={index} number={index + 1} text={text} />
                  ))}
                </div>
              </>
            ) : index === 3 ? (
              // 4️⃣ 인증 방법 섹션
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 이미지 */}
                <div className="w-[25%] flex justify-start">
                  <img
                    src={debateImg}
                    alt="Debate Icon"
                    className="w-[20rem] object-contain"
                  />
                </div>
                {/* 오른쪽 텍스트 영역 */}
                <div className="w-[75%] flex flex-col text-left">
                  <h1 className="[-webkit-text-stroke:2px_black] -webkit-text-stroke: 2px black text-[5rem] text-right text-primary-200 mb-8">
                    토론과 메모로 인증해요!
                  </h1>
                  <p className="text-[3rem] text-right">
                    🍯 스터디를 더 알차게 즐기는 꿀팁
                  </p>
                  {/* 토론 & 메모 설명 */}
                  <div className="text-[2rem] text-right text-gray-800">
                    <p className="text-primary-300">[토론]</p>
                    <p>
                      토론하고 싶은 부분을 공유하고 스터디원들과 토론해보세요!
                    </p>
                    <p className="mt-4 text-primary-300">[메모]</p>
                    <p>
                      메모하고 싶은 부분을 기록하고 언제든 다시 볼 수 있어요!
                    </p>
                  </div>
                </div>
              </div>
            ) : index === 4 ? (
              // 5️⃣ FAQ 섹션
              <>
                {/* FAQ 제목 */}
                <h1 className="text-white [-webkit-text-stroke:2px_black] black text-[5rem] mb-8">
                  FAQ
                </h1>

                {/* FAQ 목록 */}
                <div className="w-full max-w-[1000px] flex flex-col gap-8">
                  {faqDataList.map((faq, i) => (
                    <FAQItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaq === i}
                      onClick={() => toggleFaq(i)}
                    />
                  ))}
                </div>
              </>
            ) : index === 5 ? (
              // 6️⃣ 서비스 시작 섹션
              <>
                <div className="flex items-center gap-4">
                  <h1 className="[-webkit-text-stroke:2px_black] text-[5rem] text-primary-200">
                    두근두근 책꼬지하러 가기
                  </h1>

                  {/* 로그인 페이지로 이동 */}
                  <button
                    className="p-4 ml-6 rounded-lg bg-primary-200 hover:bg-primary-300 transition-all flex items-center justify-center shadow-2xl hover:shadow-3xl translate-y-0 hover:-translate-y-[2px] cursor-pointer"
                    onClick={() => navigate('/login')}
                  >
                    <img
                      src={arrowImg}
                      alt="arrow icon"
                      className="w-[2rem] h-[2rem] filter brightness-0 invert"
                    />
                  </button>
                </div>
              </>
            ) : (
              // 추후 추가될 섹션을 위해 놔둠
              <div className="text-[5rem] w-full text-center">
                {section.title}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Guide;
