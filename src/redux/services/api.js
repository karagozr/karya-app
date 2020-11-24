import axios from 'axios'
import { select } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { alertActions } from '../actions';
import { loadActions } from '../actions';

//const BASE_URL = 'http://176.236.44.66:1905';
const BASE_URL = 'https://localhost:44399';


function* getToken() {
    const token = yield select(({ auth }) => auth.token)
    return token !== undefined ? token : '';
};

export function* getUsername() {
    const username = yield select(({ auth }) => auth.username)
    return username !== undefined ? username : '';
};

export function* get(requestUrl, queryData) {
    
    const token = yield call(getToken);
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        yield put(loadActions.open())
        const { data, status } = yield axios.get(`${BASE_URL}${requestUrl}`, { ...axiosConfig, params: queryData });
        yield put(loadActions.close())
        switch (status) {
            case 200:
                return { data: data, message: 'Success', success: true }
            case 204:
                yield put(alertActions.warning('Login Error'))
                return { data: data, message: 'Login Error', success: false }
            default:
                yield put(alertActions.error('Api Error'))
                return { data: data, message: 'Api Error', success: false }
        }
    } catch (error) {

        const status = error.response?error.response.status:null        
        switch (status) {
            case 401:
                yield put(alertActions.error(`${status} - Unauthorized`))
                return { data: null, message: `${status} - Unauthorized`, success: false }
            case 404:
                yield put(alertActions.error(`${status} - Page Not Found`))
                return { data: null, message: `${status} - Page Not Found`, success: false }
            case 408:
                yield put(alertActions.error(`${status} - Timeout Error`))
                return { data: null, message: `${status} - Timeout Error`, success: false }
            default:
                yield put(alertActions.error('Network Error'))
                return { data: null, message: 'Network Error', success: false }
        }
    }
};

export function* post(requestUrl, postData) {

    const token = yield call(getToken);
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        yield put(loadActions.open())
        const { data, status } = yield axios.post(`${BASE_URL}${requestUrl}`, postData, axiosConfig);
        yield put(loadActions.close())
        switch (status) {
            case 200:
                if(requestUrl==='auth/login')
                    yield put(alertActions.success('Login Success'))
                return { data: data, message: 'Success', success: true }
            case 204:
                yield put(alertActions.warning('Login Error'))
                return { data: data, message: 'Login Error', success: false }
            default:
                yield put(alertActions.error('Api Error'))
                return { data: data, message: 'Api Error', success: false }
        }
    } catch (error) {

        const status = error.response?error.response.status:null        
        switch (status) {
            case 401:
                yield put(alertActions.error(`${status} - Unauthorized`))
                return { data: null, message: `${status} - Unauthorized`, success: false }
            case 404:
                yield put(alertActions.error(`${status} - Page Not Found`))
                return { data: null, message: `${status} - Page Not Found`, success: false }
            case 408:
                yield put(alertActions.error(`${status} - Timeout Error`))
                return { data: null, message: `${status} - Timeout Error`, success: false }
            default:
                yield put(alertActions.error('Network Error'))
                return { data: null, message:'Network Error', success: false }
        }
    }
}
