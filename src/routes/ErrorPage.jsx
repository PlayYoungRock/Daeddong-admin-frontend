import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import { HOME_PAGE } from './router';
import { Button, Text } from '../components';

const STATUS_TEXT = {
  400: '에러 페이지',
  403: '권한 없는 페이지',
  404: '조회 불가 페이지',
  500: '서버 에러 페이지',
};

const useErrorPage = () => {
  const navigate = useNavigate();
  const { status } = useParams();

  const text = useMemo(() => STATUS_TEXT?.[status] ?? STATUS_TEXT[400], [status]);

  const handleGoHomePage = () => navigate(HOME_PAGE);

  return { text, handleGoHomePage };
};

const ErrorPage = () => {
  const { text, handleGoHomePage } = useErrorPage();
  return (
    <Container>
      <Text size="30px" lineHeight="34px">
        {text}
      </Text>
      <Button width="300px" onClick={handleGoHomePage}>
        Go HomePage
      </Button>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
