const StudyRules = () => {
  return (
    <div className="px-24 py-12">
      <h2 className="text-3xl mb-4 text-center">스터디 규칙</h2>
      <ul className="text-2xl text-center">
        {['주 1회 토론 꼭 참여', '토론 글에 댓글 꼭 달기'].map(
          (item, index) => (
            <li key={index} className="mb-4">
              {index + 1}. {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default StudyRules;
