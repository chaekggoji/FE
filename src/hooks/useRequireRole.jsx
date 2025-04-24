import useUserStore from '@store/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRequireRole = (memberList, allowedRoles = []) => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const navigate = useNavigate();

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
