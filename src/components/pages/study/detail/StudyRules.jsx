const rules = ['주 1회 토론 꼭 참여', '토론 글에 댓글 꼭 달기'];

const StudyRules = () => {
  return (
    <div className="lg:px-24 md:py-12 py-6 border-b-1 border-slate-200">
      <h2 className="text-3xl mb-4 text-center">스터디 규칙</h2>
      <ul className="text-2xl text-center">
        {rules.map((item, index) => (
          <li
            key={index}
            className={`${index !== rules.length - 1 ? 'mb-4' : ''}`}
          >
            {index + 1}. {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyRules;
