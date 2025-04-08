import Pagination from '@components/common/Pagination';
import StudyCardList from '@components/pages/profile/StudyCardList';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import { STATUS_FILTER } from '@/constants/bookSearch';
import { useState } from 'react';

const Studies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="lg:p-20 md:p-16 sm:p-10">
      <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto p-10 bg-white rounded-2xl">
        <h2 className="text-3xl text-center py-7.5">스터디 목록</h2>
        <div className="flex justify-end mb-7.5">
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={STATUS_FILTER}
            buttonClassName="bg-primary-200 text-white border-primary-300"
            menuClassName="border-primary-300"
            itemClassName="rounded-none hover:text-white"
            widthClass="w-30"
          />
        </div>
        <StudyCardList />
        <div className="py-7.5">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Studies;
