import { post} from './api';

const LOGIN_URL = 'auth/login';

export const loginService = (postData) => {
  return post(LOGIN_URL,postData)
};