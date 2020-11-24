import { put, call } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { syncUserConstants as types } from '../constants'
import { history } from '../../helpers';
import { post } from "../services/api";


const AUTH_URL = '/auth'
const LOGIN_URL = '/login';

export function* login({ payload }) 
{
  const url = AUTH_URL+LOGIN_URL
  const {data, success,message} = yield call(post,url, payload);
  if (success) {
    let decodedToken = data.token? jwtDecode(data.token):null
    yield put({ type: types.LOGIN_SUCCESS, payload: { login: true, token: data.token, username:decodedToken.sub } })
    yield call(forwardTo, '/');
  } else {
    yield put({ type: types.LOGIN_ERROR, payload: { login: false, message: message } })
  }
}

function forwardTo(location) {
  history.push(location);
}