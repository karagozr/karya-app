import {syncUserConstants as types ,asyncUserConstants as typesAsync} from '../constants';



export const loginAction = (data) => {
  return {
    type: typesAsync.LOGIN_REQUEST,
    payload :data
  }
};

export const logoutAction = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload :{}
  }
};