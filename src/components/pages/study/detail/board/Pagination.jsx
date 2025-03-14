const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 h-[64px] *:cursor-pointer">
      <div className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500">
        이전
      </div>
      <div className="px-4 py-1  border-slate-500 rounded-xl text-white bg-primary-300">
        1
      </div>
      <div className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500">
        2
      </div>
      <div className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500">
        3
      </div>
      <div className="px-4 py-1 border-1 border-slate-500 rounded-xl text-slate-500">
        다음
      </div>
    </div>
  );
};

export default Pagination;
