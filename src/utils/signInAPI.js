import { authHttp } from './http';

export const ADMIN_TOKEN = 'admin-token';
export const SIGN_IN = 'login';

export const postSignIn = async (form) => {
  const { data } = await authHttp.post(SIGN_IN, form);

  return data;
};
