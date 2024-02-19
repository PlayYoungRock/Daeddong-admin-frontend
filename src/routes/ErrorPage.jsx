import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE } from './router';
import { Button, Text } from '../components';
import styled from 'styled-components';

const useErrorPage = () => {
  const navigate = useNavigate();
  const handleGoHomePage = () => navigate(HOME_PAGE);

  return { handleGoHomePage };
};

const ErrorPage = () => {
  const { handleGoHomePage } = useErrorPage();
  return (
    <Container>
      <Text size="30px" lineHeight="34px">
        ErrorPage
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
