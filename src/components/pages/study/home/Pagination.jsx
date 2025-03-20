export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='flex justify-center gap-2 mt-4'>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 text-2xl py-1 rounded-lg border-2 border-primary-300 disabled:opacity-50'
      >
        이전
      </button>

      {/* 페이지 버튼들 */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 text-2xl py-1 rounded-lg border-2 border-primary-300 ${currentPage === index + 1 ? 'bg-primary-300 text-white' : 'border'}`}
        >
          {index + 1}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 text-2xl py-1 rounded-lg border-2 border-primary-300 disabled:opacity-50'
      >
        다음
      </button>
    </div>
  );
}
