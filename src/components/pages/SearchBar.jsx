import SearchIcon from "@/assets/icons/icon_search_24.svg";
import { SEARCH_CATEGORIES } from "@/constants/bookSearch";

export default function SearchBar({ search, setSearch, filter, setFilter, onSearch }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-primary-200 text-white text-4xl px-4 py-2 rounded-md">
        {SEARCH_CATEGORIES.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="좋은 책을 찾아보세요"
        className="border text-4xl rounded-md px-4 py-2 flex-grow"
      />
      <button onClick={onSearch} className="bg-primary-200 p-2 rounded-full flex items-center justify-center w-15 h-15">
        <img src={SearchIcon} alt="검색" className="w-10 h-10 invert" />
      </button>
    </div>
  );
}
