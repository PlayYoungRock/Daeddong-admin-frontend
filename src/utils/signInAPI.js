import { Http } from './http';

export const SIGN_IN = 'login';

export const postSignIn = async (form) => {
  const data = await Http.post(SIGN_IN, form);

  return data;
};
