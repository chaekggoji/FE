import { SORT_OPTIONS } from "@/constants/bookSearch";

export default function SortDropdown({ sort, setSort }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="bg-primary-200 text-4xl text-white px-4 py-2 rounded-md w-32"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
