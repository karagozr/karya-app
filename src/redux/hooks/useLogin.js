import axios from 'axios';

import { loginAction } from '../actions';

export const useLogin = (loginData) => {
    dispatch(loginAction({
        type: types.LOGIN_USER,
        loginData
    }));
};