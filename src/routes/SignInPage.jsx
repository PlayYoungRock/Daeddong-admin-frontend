import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Text } from '@components';
import { postSignIn } from '@utils';

import { HOME_PAGE, LOCATION_LIST_PAGE } from './router';

const useSignInViewModel = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postSignIn,
    onSuccess: () => navigate(`${HOME_PAGE}${LOCATION_LIST_PAGE}`),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        alert('회원정보가 일치하지 않습니다.');
      }
    },
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleOnSubmit = useCallback(() => {
    mutate(form);
  }, [mutate, form]);

  return { form, handleOnChange, handleOnSubmit };
};

const SignInPage = () => {
  const { form, handleOnChange, handleOnSubmit } = useSignInViewModel();
  return (
    <Container>
      <Wrapper>
        <Text size="28px" fontWeight={600}>
          대똥여지도 어드민
        </Text>
        <InputWrapper>
          <Input
            placeholder="username"
            name="username"
            value={form.username}
            onChange={handleOnChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleOnChange}
          />
        </InputWrapper>
        <Button onClick={handleOnSubmit}>로그인</Button>
      </Wrapper>
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
