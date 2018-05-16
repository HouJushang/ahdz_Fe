import {getApi, postApi, putApi, delApi} from '../api/api'
function queryRoleMenu(id){
  return getApi(`admin/roleMenu/${id}`)
}
function delRoleMenu(data){
  return delApi('admin/roleMenu', data)
}
function addRoleMenu(data){
  return postApi('admin/roleMenu', data)
}
export {
  queryRoleMenu,
  delRoleMenu,
  addRoleMenu,
}
