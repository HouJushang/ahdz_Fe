import {getApi, postApi, putApi, delApi} from '../api/api'
function queryUser(data){
  return getApi('admin/websiteUser', data)
}
function delUser(data){
  return delApi('admin/websiteUser', data)
}
function delUser2(data){
  return delApi('admin/websiteUser2', data)
}
function addUser(data){
  return postApi('admin/websiteUser', data)
}
function updateUser(data){
  return putApi('admin/websiteUser', data)
}
export {
  queryUser,
  delUser,
  addUser,
  updateUser,
  delUser2
}
