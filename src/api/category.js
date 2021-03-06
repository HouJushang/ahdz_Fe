import {getApi, postApi, putApi, delApi} from '../api/api'
function queryCategory(data){
  return getApi('admin/category', data)
}
function delCategory(data){
  return delApi('admin/category', data)
}
function addCategory(data){
  return postApi('admin/category', data)
}
function updateCategory(data){
  return putApi('admin/category', data)
}
function getCategoryById(id) {
  return getApi(`admin/categoryById/${id}`)
}
export {
  queryCategory,
  delCategory,
  addCategory,
  updateCategory,
  getCategoryById
}
