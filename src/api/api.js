/**
 * Created by gen on 2017/8/29.
 */
import axios from 'axios'
import {baseUrl} from '../config'
import Vue from '../main'
import Router from '../router/index'

axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
  const responseData = response.data;
  switch (responseData.code) {
    case 'success':
      console.log(response)
      return Promise.resolve(responseData.data);
    case 'error':
      Vue.$message.error(responseData.message);
      return Promise.reject(responseData.message);
    case 'authError':
      Router.push({name: 'login'});
      return Promise.reject(responseData.message);
    default:
      Vue.$message.error(responseData.message);
      return Promise.reject(responseData.message);
  }
}, function (error) {
  Vue.$message.error('网络错误');
  return Promise.reject('网络错误');
})

const getApi = function (url, data) {
  url = baseUrl + url
  return axios.get(url, {
    params: data,
  })
}
const delApi = function (url, data) {
  url = baseUrl + url
  return axios.delete(url, {
    params: data
  })
}

const postApi = function (url, data) {
  url = baseUrl + url
  return axios.post(url, data)
}

const putApi = function (url, data) {
  url = baseUrl + url
  return axios.put(url, data)
}
const upload = function (url, data) {
  url = baseUrl + url
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
export {
  getApi,
  delApi,
  postApi,
  putApi,
  upload,
}
