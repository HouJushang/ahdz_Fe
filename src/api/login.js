import {postApi} from '../api/api'
function login(data){
  return postApi('login', data)
}
function loginOut(data){
  return postApi('loginOut', data)
}
export {
  login,
  loginOut
}
