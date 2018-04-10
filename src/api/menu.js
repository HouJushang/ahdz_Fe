import {getApi, postApi, putApi, delApi} from '../api/api'
function queryMenu(data){
  return getApi('admin/menu', data)
}
function delMenu(data){
  return delApi('admin/menu', data)
}
function addMenu(data){
  return postApi('admin/menu', data)
}
function updateMenu(data){
  return putApi('admin/menu', data)
}
export {
  queryMenu,
  delMenu,
  addMenu,
  updateMenu
}
