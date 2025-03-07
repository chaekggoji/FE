import { Link } from 'react-router';
import githubIco from '@assets/icons/icon_github_16.svg';
import mailIco from '@assets/icons/icon_mail_16.svg';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-6 md:py-4 sm:py-3 px-4 h-auto shadow-inner text-center">
      {/* 저작권 문구 */}
      <p className="text-lg md:text-base sm:text-sm">
        © {new Date().getFullYear()} 쁘로젝또. All Rights Reserved.
      </p>

      {/* 링크 목록 */}
      <div className="flex gap-10 md:gap-6 sm:gap-4 items-center mt-4">
        <Link
          to="#"
          className="text-lg md:text-base sm:text-sm text-gray-700 hover:text-gray-900"
        >
          개인정보처리방침
        </Link>

        <Link
          to="https://github.com/chaekggoji/FE"
          className="flex items-center gap-3 sm:gap-2 text-gray-700 hover:text-gray-900"
        >
          <img
            src={githubIco}
            alt="깃허브 아이콘"
            className="w-6 h-6 sm:w-5 sm:h-5"
          />
          <span className="text-lg md:text-base sm:text-sm">GitHub</span>
        </Link>

        <Link
          to="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=comeseul312@gmail.com"
          className="flex items-center gap-3 sm:gap-2 text-gray-700 hover:text-gray-900"
        >
          <img
            src={mailIco}
            alt="메일 아이콘"
            className="w-6 h-6 sm:w-5 sm:h-5"
          />
          <span className="text-lg md:text-base sm:text-sm">문의하기</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
