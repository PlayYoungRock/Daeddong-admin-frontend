import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ADMIN_LIST_PAGE, HOME_PAGE, LOCATION_LIST_PAGE, SIGN_IN_PAGE } from './router';
import { Text } from '@components';
import { ADMIN_TOKEN } from '@utils';
import { jwtDecode } from 'jwt-decode';

const useHomePage = () => {
  const navigationList = [
    { label: '공지사항', path: '/' },
    { label: '장소목록', path: LOCATION_LIST_PAGE },
    { label: '관리자목록', path: ADMIN_LIST_PAGE },
  ];

  const navigate = useNavigate();
  // 로그인확인
  useEffect(() => {
    // NOTE expired나 refresh 정책이 필요함
    const { accessToken } = JSON.parse(localStorage.getItem(ADMIN_TOKEN) ?? '{}');
    if (!accessToken) {
      navigate(`${HOME_PAGE}${SIGN_IN_PAGE}`);
      return;
    }

    const { auth } = jwtDecode(accessToken);
    if (auth !== 'ROLE_ADMIN') {
      navigate(`${HOME_PAGE}${SIGN_IN_PAGE}`);
      return;
    }
  }, [navigate]);
  return { navigationList, navigate };
};

const HomePage = () => {
  const { navigationList, navigate } = useHomePage();

  return (
    <Container>
      <LNB>
        {navigationList.map(({ label, path }, i) => (
          <LNBItem key={`lnb-${label}-${i}`} onClick={() => navigate(path)}>
            <Text size="24px" lineHeight="28px" fontWeight={600}>
              {label}
            </Text>
          </LNBItem>
        ))}
      </LNB>
      <Outlet />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const LNB = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-right: 1px solid gainsboro;
`;

const LNBItem = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8px;
  list-style: none;

  border-radius: 10px;

  &:hover {
    background-color: darkgray;
  }
  cursor: pointer;
`;
