import {postApi} from '../api/api'
function login(data){
  return postApi('login', data)
}
export {
  login
}
