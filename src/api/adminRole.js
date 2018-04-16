import {getApi, postApi, putApi, delApi} from '../api/api'
function queryAdminRole(data){
  return getApi('admin/adminRole', data)
}
function delAdminRole(data){
  return delApi('admin/adminRole', data)
}
function addAdminRole(data){
  return postApi('admin/adminRole', data)
}
function updateAdminRole(data){
  return putApi('admin/adminRole', data)
}
export {
  queryAdminRole,
  delAdminRole,
  addAdminRole,
  updateAdminRole
}
