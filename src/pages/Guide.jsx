import React, { useState } from "react";
import theme from "/src/styles/theme.js"; // theme.js에서 색상 불러오기
import bookClubIcon from "/src/assets/bookClub.svg";
import introIcon from "/src/assets/intro.svg";
import debateIcon from "/src/assets/debate.svg";
import { useNavigate } from "react-router-dom";

const sections = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `섹션 ${index + 1}`
}));

const faqData = [
  { question: "스터디 인원은 몇 명인가요?", answer: "스터디 인원은 최소 1명부터 최대 8명까지 가능합니다." },
  { question: "흔한 질문이 뭐가 있을까요?", answer: "아이디어를 주라요." },
  { question: "오늘 점심은 뭐 먹을까요?", answer: "핀볼 게임으로 정해보아용." }
];

const Guide = () => {
  const [activeTab, setActiveTab] = useState(1); // Tab
  const [openFaq, setOpenFaq] = useState(null); // FAQ 토글 상태
  const navigate = useNavigate(); // 페이지 이동

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-ownglyph text-center">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="w-full min-h-[800px] flex justify-center items-center"
          style={{
            backgroundColor: index % 2 === 0 ? theme.colors.primary[200] : "white",
          }}
        >
          {/* ✅ 컨텐츠 감싸는 div (너비 60%, 중앙 정렬) */}
          <div className="w-[60vw] max-w-[1200px] flex flex-col justify-between items-center h-[70%]">
            {index === 0 ? (
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 텍스트 영역 */}
                <div className="flex flex-col text-left w-[55%]">
                  <h1 className="text-white [-webkit-text-stroke:2px_black]  text-[5rem]">우리들의 독서 공간</h1>
                  <p className="text-[2rem]">독서 좋아하는 사람들 여기여기 붙어라 👍🏻</p>
                </div>
                {/* 오른쪽 아이콘 */}
                <div className="w-[25%] flex justify-end">
                  <img src={bookClubIcon} alt="Book Club Icon" className="w-[20rem] object-contain" />
                </div>
              </div>
            ) : index === 1 ? (
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 아이콘 */}
                <div className="w-[25%] flex justify-start">
                  <img src={introIcon} alt="Intro Icon" className="w-[20rem] object-contain" />
                </div>
                {/* 오른쪽 텍스트 영역 */}
                <div className="flex flex-col text-right w-[55%]">
                  <h1 className="[-webkit-text-stroke:2px_black]  text-[5rem]" style={{ color: theme.colors.primary[200] }}>책꼬지가 뭔가요?</h1>
                  <p className="text-[2rem]">‘책꼬지’는 책과 모꼬지의 합성어로, 독서 모임을 뜻하는 말이에요.</p>
                  <p className="text-[1.5rem] text-gray-700">*책꼬지하다: 독서 스터디를 위해 모이다.</p>
                </div>
              </div>
            ) : index === 2 ? (
              <>
                {/* 책꼬지 활용법 */}
                <h1 className="text-white [-webkit-text-stroke:2px_black] text-[5rem] mb-6">책꼬지 활용하는 법</h1>
                {/* 탭 영역 */}
                <div className="flex w-full max-w-[1200px] h-[40%] bg-[#FFF5E4] rounded-t-lg">
                  <button
                    className={`flex-1 py-4 rounded-t-lg ${activeTab === 1 ? "bg-[#FFF5E4]" : "bg-primary-300"}`}
                    onClick={() => setActiveTab(1)}
                  >
                    <h2 className="text-[3rem]">📚 스터디에 참여할래요!</h2>
                  </button>
                  <button
                    className={`flex-1 py-4 rounded-t-lg ${activeTab === 2 ? "bg-[#FFF5E4]" : "bg-primary-300"}`}
                    onClick={() => setActiveTab(2)}
                  >
                    <h2 className="text-[3rem]">🦁 스터디를 만들고 싶어요!</h2>
                  </button>
                </div>

                {/* 방법 영역 */}
                <div className="w-full max-w-[1200px] h-[50%] min-h-[400px] bg-[#FFF5E4] p-8 rounded-b-lg text-left flex flex-col justify-center gap-4 pl-6">
                  {activeTab === 1 ? (
                    <>
                      <p className="text-[2rem]">1. 어떤 스터디가 있는지 구경한다.</p>
                      <p className="text-[2rem]">2. 책 이름을 검색해본다.</p>
                      <p className="text-[2rem]">3. 원하는 스터디에 가입하고 책을 읽는다!</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[2rem]">1. 스터디 생성을 클릭한다.</p>
                      <p className="text-[2rem]">2. 진행할 도서와 규칙 등을 기입한다.</p>
                      <p className="text-[2rem]">3. 함께 책을 즐길 멤버를 모집한다!</p>
                    </>
                  )}
                </div>
              </>
            ) : index === 3 ? (
              <div className="w-full flex flex-row justify-between items-center">
                {/* 왼쪽 아이콘 */}
                <div className="w-[25%] flex justify-start">
                  <img src={debateIcon} alt="Debate Icon" className="w-[20rem] object-contain" />
                </div>
                {/* 오른쪽 텍스트 영역 */}
                <div className="flex flex-col text-left w-[55%]">
                  <h1 className="[-webkit-text-stroke:2px_black] -webkit-text-stroke: 2px black text-[5rem] text-right" style={{ color: theme.colors.primary[200] }}>토론과 메모로 인증해요!</h1>
                  <p className="text-[3rem] text-right font-bold">🍯 스터디를 더 알차게 즐기는 꿀팁</p>
                  {/* 토론 & 메모 설명 */}
                  <div className="text-[2rem] text-right text-gray-800">
                    <p className="font-bold" style={{ color: theme.colors.primary[300] }}>[토론]</p>
                    <p>토론하고 싶은 부분을 공유하고 스터디원들과 토론해보세요!</p>
                    <p className="mt-4 font-bold" style={{ color: theme.colors.primary[300] }}>[메모]</p>
                    <p>메모하고 싶은 부분을 기록하고 언제든 다시 볼 수 있어요!</p>
                  </div>
                </div>
              </div>
            ) : index === 4 ? (
              <>
                {/* ✅ FAQ 제목 */}
                <h1 className="text-white [-webkit-text-stroke:2px_black] black text-[5rem] mb-6 ">FAQ</h1>

                {/* ✅ FAQ 목록 */}
                <div className="w-full max-w-[1000px] flex flex-col gap-4">
                  {faqData.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-[#FFF5E4] rounded-lg shadow-md text-left text-[3rem]"
                    >
                      {/* 질문 부분 */}
                      <button
                        className="w-full p-6 text-[2rem] font-bold flex justify-between items-center"
                        onClick={() => toggleFaq(i)}
                      >
                        {faq.question}
                        <span className="text-[2rem]">{openFaq === i ? "▲" : "▼"}</span>
                      </button>

                      {/* 답변 부분 (토글) */}
                      {openFaq === i && (
                        <div className="p-6 text-[1.8rem] text-gray-800 border-t border-gray-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : index === 5 ? (
              <>
                {/* ✅ 책꼬지 이동 섹션 */}
                <div className="flex items-center gap-4">
                  <p className="text-[5rem] text-primary-800 text-white [-webkit-text-stroke:2px_black]" style={{ color: theme.colors.primary[200] }}>두근두근 책꼬지하러 가기</p>

                  {/* ✅ 로그인 페이지 이동 버튼 */}
                  <button
                    className="p-4 rounded-lg bg-primary-300 hover:bg-primary-400 transition-all flex items-center justify-center"
                    onClick={() => navigate("/login")}
                  >
                    <span className="text-[2rem]">➝</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-[5rem] font-bold w-full text-center">{section.title}</div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Guide;
