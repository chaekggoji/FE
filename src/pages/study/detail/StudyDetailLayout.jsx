import barIcon from '@assets/icons/icon_bar_white_24.svg';
import StudyNavLink from '@components/pages/study/detail/StudyNavLink';
import useOutsideClick from '@hooks/useOutsideClick';
import { useRef, useState } from 'react';
import { Outlet } from 'react-router';

const pages = [
  {
    route: 'home',
    title: '스터디 홈',
  },
  {
    route: 'notices',
    title: '공지사항',
  },
  {
    route: 'debates',
    title: '토론 나눠요',
  },
  {
    route: 'phrases',
    title: '구절 공유해요',
  },
  {
    route: 'manage',
    title: '스터디원 관리',
  },
];

const StudyDetailLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxRef = useRef();

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(dropdownBoxRef, () => setIsOpen(false));

  return (
    <div className="flex lg:-mx-10 min-h-[calc(100vh-74px)]">
      <nav className="w-[220px] bg-primary-100 shrink-0 hidden lg:block">
        {pages.map((page, index) => (
          <StudyNavLink key={index} to={page.route}>
            {page.title}
          </StudyNavLink>
        ))}
      </nav>
      <main className="grow relative">
        <div
          className="absolute left-0 top-[24px] lg:hidden z-10"
          ref={dropdownBoxRef}
        >
          <div
            className="size-12 bg-primary-200 rounded-full flex justify-center items-center cursor-pointer shadow-float-button"
            onClick={handleDropdownClick}
          >
            <img src={barIcon} className="size-6" />
          </div>
          <div
            className={`absolute border-slate-400 border-1 rounded-xl bg-white top-[56px] left-0  transition-all opacity-0 ${isOpen ? 'opacity-100' : 'pointer-events-none'}`}
          >
            {pages.map((page, index) => (
              <p
                key={index}
                className={`py-1 w-24 text-center border-slate-400 cursor-pointer  hover:bg-primary-100 ${index === 0 ? 'rounded-t-xl border-b-1' : index === pages.length - 1 ? 'rounded-b-xl' : 'border-b-1'}`}
                onClick={() => setIsOpen(false)}
              >
                {page.title}
              </p>
            ))}
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default StudyDetailLayout;
