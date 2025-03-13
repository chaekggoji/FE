import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";

export default function BookItem() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("books").select("id, title, author, thumb_url");
      if (error) {
        console.error("책 데이터 불러오기 오류:", error);
      } else {
        setBooks(data);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div className="w-full py-6"> {/* ✅ 부모 컨테이너를 꽉 채움 */}
      <div className="flex justify-between w-full gap-x-20"> {/* ✅ 카드 간격 더 넓힘 */}
        {books.slice(0, 4).map((book, index) => (
          <div
            key={book.id}
            className={`flex-1 aspect-[7/11] bg-white rounded-3xl shadow-2xl overflow-hidden /* ✅ 모서리 더 둥글게 + 넘침 방지 */
              ${index === 0 ? "pl-0" : ""}  /* 첫 번째 카드 왼쪽 여백 없음 */
              ${index === 3 ? "pr-0" : ""}  /* 마지막 카드 오른쪽 여백 없음 */
            `}
          >
            {/* 책 썸네일 (전체 높이의 70%) */}
            <div className="w-full h-[70%]">
              <img
                src={book.thumb_url || "/assets/images/default_book.png"}
                alt={book.title}
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            {/* 책 정보 영역 (전체 높이의 30%) */}
            <div className="p-4 flex flex-col justify-between h-[30%]">
              <p className="text-left pt-2 pl-4 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 
                overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {book.title}
              </p>
              <p className="text-right pb-2 pr-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl text-black
                overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {book.author ? `by ${book.author}` : "저자 정보 없음"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
