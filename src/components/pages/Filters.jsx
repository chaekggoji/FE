import { DURATION_FILTERS, BOOK_CATEGORIES } from "@/constants/bookSearch";

export default function Filters({ duration, setDuration, category, setCategory }) {
  return (
    <div className="flex gap-4">
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border text-4xl px-4 py-2 rounded-md w-50"
      >
        {DURATION_FILTERS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border text-4xl px-4 py-2 rounded-md w-50"
      >
        {BOOK_CATEGORIES.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
