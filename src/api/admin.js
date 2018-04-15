import {getApi, postApi, putApi, delApi} from '../api/api'
function queryAdmin(data){
  return getApi('admin/admin', data)
}
function delAdmin(data){
  return delApi('admin/admin', data)
}
function addAdmin(data){
  return postApi('admin/admin', data)
}
function updateAdmin(data){
  return putApi('admin/admin', data)
}
export {
  queryAdmin,
  delAdmin,
  addAdmin,
  updateAdmin
}
