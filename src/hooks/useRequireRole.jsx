import useUserStore from '@store/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRequireRole = (memberList, allowedRoles = []) => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const navigate = useNavigate();
  // leader가 아니면 403 에러 페이지로 이동
  useEffect(() => {
    const isAuthorized = memberList?.some((member) => {
      return (
        member.users.id === loggedInUserId && allowedRoles.includes(member.role)
      );
    });

    if (!isAuthorized) {
      navigate('/403', { replace: true });
    }
  }, [memberList, allowedRoles]);
};

export default useRequireRole;
