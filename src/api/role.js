import {getApi, postApi, putApi, delApi} from '../api/api'
function queryRole(data){
  return getApi('admin/role', data)
}
function delRole(data){
  return delApi('admin/role', data)
}
function addRole(data){
  return postApi('admin/role', data)
}
function updateRole(data){
  return putApi('admin/role', data)
}
export {
  queryRole,
  delRole,
  addRole,
  updateRole
}
