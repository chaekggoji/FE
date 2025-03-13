export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-primary-200 text-white" : "border"}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
