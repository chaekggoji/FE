import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import PropTypes from 'prop-types';
import { useState } from 'react';

const StudyForm = () => {
  // 카테고리 더미 데이터(상수 처리 vs DB 호출 고려 중)
  const BookCategoryList = [
    { id: 1, title: '자기계발' },
    { id: 2, title: '인문' },
    { id: 3, title: '경제/경영' },
    { id: 4, title: '처세' },
    { id: 5, title: 'IT' },
    { id: 6, title: '소설' },
    { id: 7, title: '과학' },
    { id: 8, title: '시/에세이' },
    { id: 9, title: '역사/문화' },
    { id: 10, title: '건강' },
    { id: 11, title: '요리' },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [dropdownValue, setDropdownValue] =
    useState('도서 카테고리를 선택해주세요.');

  // 카테고리 드롭다운(추가 수정 예정)
  const BookCategoryOption = BookCategoryList.map((item) => (
    <li
      id={item.title}
      key={item.id}
      value={item.id}
      className="hover:bg-primary-100 cursor-pointer"
      onClick={() => {
        setDropdownValue(item.title);
        setIsDropdownOpen(!isDropdownOpen);
      }}
    >
      {item.title}
    </li>
  ));

  return (
    <form className="flex flex-col gap-y-6 sm:gap-y-10">
      <CustomInputField
        labelText="스터디 이름"
        type="text"
        placeholder="스터디 이름을 입력해주세요."
        id="studyName"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-10">
        <CustomInputField
          labelText="스터디 시작일"
          type="date"
          placeholder="스터디 시작일을 선택해주세요."
          id="studyStartDate"
        />
        <CustomInputField
          labelText="스터디 종료일"
          type="date"
          placeholder="스터디 종료일을 선택해주세요."
          id="studyEndDate"
        />
      </div>
      <CustomInputField
        labelText={`스터디 모집 인원`}
        type="number"
        min="1"
        max="8"
        placeholder="참여인원을 입력해주세요."
        id="studyCapacity"
      />
      <div className="relative">
        <label
          htmlFor="bookCategory"
          className="mb-1 text-gray-400 sm:text-2xl"
        >
          도서 카테고리
        </label>
        <div
          className="flex w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl focus:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300 cursor-pointer"
          onClick={toggleDropdown}
        >
          {dropdownValue}
        </div>
        <ul
          className={`${isDropdownOpen ? 'block' : 'hidden'} absolute left-0 top-[74px] sm:top-[86px] bg-white flex flex-col gap-y-2 w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl`}
        >
          {BookCategoryOption}
        </ul>
      </div>
      <CustomTextarea
        labelText="스터디 소개"
        placeholder="스터디 소개를 입력해주세요."
      />
      <CustomTextarea
        labelText="스터디 규칙"
        placeholder="스터디 규칙을 입력해주세요."
      />
    </form>
  );
};

StudyForm.propTypes = {
  BookCategoryOption: PropTypes.object,
};

export default StudyForm;
