import axios from 'axios'
const BASE_URL = 'http://176.236.44.66:1905';


export function* getService(param,callback) {
  yield callback()
  return param*2;

};





























export const get = (requestUrl, queryData) => {
  
  //const token = select(({auth})=>a)

  const localStroge = JSON.parse(localStorage.getItem('persist:root'))
  
  const auth = JSON.parse(localStroge.auth);
  const axiosConfig = {
    headers: auth==={}?{
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }:{
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${auth.token}`
    }
  };
  
  let response = axios.get(`${BASE_URL}/${requestUrl}`, { ...axiosConfig, params: queryData })

  return response.then(({ data, status }) => {
    if (status === 204) {
      return { data: null, message: 'Login Error', success: false }
    } else if (status === 200) {
      return { data, message: status, success: true }
    } else {
      return { data: null, message: 'Other Error', success: false }
    }
  }).catch(error => {
    if (!error.response) {
      return { data: null, message: 'Api Response Error', success: false }
    }
    let { status } = error.response
    if (status === 401) {
      return { data: null, message: 'Authorization Error', success: false }
    } else {
      return { data: null, message: status + ' Error', success: false }
    }
  });
};

export const post = (requestUrl, postData) => {
  
  const localStroge = JSON.parse(localStorage.getItem('persist:root'))
  
  const auth = JSON.parse(localStroge.auth);
  
  const axiosConfig = {
    headers: auth==={}?{
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }:{
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${auth.token}`
    }
  };
  
  return axios.post(`${BASE_URL}/${requestUrl}`, postData, axiosConfig).then(({ data, status }) => {
    if (status === 204) {
      return { data: null, message: 'Login Error', success: false }
    } else if (status === 200) {
      return { data, message: status, success: true }
    } else {
      return { data: null, message: 'Other Error', success: false }
    }
  }).catch(error => {

    if (!error.response) {
      return { data: null, message: 'Api Response Error', success: false }
    }
    let { status } = error.response

    if (status === 401) {
      return { data: null, message: 'Authorization Error', success: false }
    } else {
      return { data: null, message: status + ' Error', success: false }
    }

  });
};