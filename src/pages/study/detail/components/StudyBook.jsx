const StudyBook = () => {
  return (
    <div className="flex-1/2 flex flex-col items-center">
      <h2 className="text-3xl mb-5 text-center">도서 정보</h2>
      {/* 카카오 API 썸네일 크기 120x174 */}
      <div className="w-[240px] h-[348px] rounded-tr-2xl rounded-br-2xl relative shadow-book cursor-pointer">
        <img
          src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3691137"
          className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
        />
        <div className="w-full h-[80px] bg-white rounded-br-2xl absolute left-0 bottom-0 flex flex-col justify-center p-4">
          <p className="">다슬이가 괜찮을까요?</p>
          <p className="ml-auto">by{'김용희'}</p>
        </div>
      </div>
    </div>
  );
};

export default StudyBook;
