import { Link } from 'react-router-dom';
import githubIco from '@assets/icons/icon_github_16.svg';
import mailIco from '@assets/icons/icon_mail_16.svg';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-6 md:py-4 sm:py-3 px-4 h-auto text-center text-2xl md:text-xl sm:text-lg shadow-inner shadow-gray-200 ">
      {/* 저작권 문구 */}
      <p className="text-xl md:text-lg sm:text-base">
        © {new Date().getFullYear()} 쁘로젝또. All Rights Reserved.
      </p>

      {/* 링크 목록 */}
      <div className="flex gap-10 md:gap-6 sm:gap-4 items-center mt-4">
        <Link to="/guide">책꼬지 이용안내</Link>

        <Link
          to="https://github.com/chaekggoji/FE"
          className="flex items-center gap-3 sm:gap-2"
        >
          <img
            src={githubIco}
            alt="깃허브 아이콘"
            className="w-6 h-6 sm:w-5 sm:h-5"
          />
          <span>GitHub</span>
        </Link>

        <Link
          to="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=comeseul312@gmail.com"
          className="flex items-center gap-3 sm:gap-2"
        >
          <img
            src={mailIco}
            alt="메일 아이콘"
            className="w-6 h-6 sm:w-5 sm:h-5"
          />
          <span>문의하기</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
