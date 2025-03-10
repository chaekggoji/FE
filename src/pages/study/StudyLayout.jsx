import { NavLink, Outlet } from 'react-router';

// const LayoutContainer = styled.div`
//   display: flex;
//   margin: 0 -40px;
// `;

// const SideBar = styled.nav`
//   width: 220px;
//   height: 100%;
//   background-color: ${({ theme }) => theme.colors.primary[100]};
// `;

// const NavList = styled(NavLink)`
//   display: block;
//   background-color: ${({ theme }) => theme.colors.primary[100]};
//   height: 52px;
//   padding: 14px 20px;
//   &.active {
//     background-color: ${({ theme }) => theme.colors.primary[200]};
//   }
// `;

// const Main = styled.div`
//   flex-grow: 1;
//   flex-basis: 0;
// `;

const StudyLayout = () => {
  return (
    // <LayoutContainer>
    //   <SideBar>
    //     <NavList to="home">스터디 홈</NavList>
    //     <NavList to="notices">공지사항</NavList>
    //     <NavList to="debates">토론 나눠요</NavList>
    //     <NavList to="phrases">구절 공유해요</NavList>
    //     <NavList to="users">스터디원 관리</NavList>
    //   </SideBar>
    //   <Main>
    //     <Outlet />
    //   </Main>
    // </LayoutContainer>
    <div>
      <div>side bar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudyLayout;
