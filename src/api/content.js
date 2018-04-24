import {getApi, postApi, putApi, delApi} from '../api/api'
function queryContent(id,data){
  return getApi(`admin/content/${id}`, data)
}
function queryOneContent(data){
  return getApi('admin/getOneContent', data)
}
function delContent(id, data){
  return delApi(`admin/content/${id}`, data)
}
function addContent(id, data){
  return postApi(`admin/content/${id}`, data)
}
function updateContent(id, data){
  return putApi(`admin/content/${id}`, data)
}
export {
  queryOneContent,
  queryContent,
  delContent,
  addContent,
  updateContent
}
