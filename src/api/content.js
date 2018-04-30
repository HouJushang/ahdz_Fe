import {getApi, postApi, putApi, delApi} from '../api/api'
function queryContent(categiryId,data){
  return postApi(`admin/listContent/${categiryId}`, data)
}
function queryOneContent(data){
  return getApi('admin/getOneContent', data)
}
function delContent(categiryId, id){
  return delApi(`admin/content/${categiryId}`, {id: id})
}
function addContent(categiryId, data){
  return postApi(`admin/content/${categiryId}`, data)
}
function checkContent(categiryId, data){
  return putApi(`admin/checkContent/${categiryId}`, data)
}
function updateContent(categiryId, data){
  return putApi(`admin/content/${categiryId}`, data)
}
export {
  queryOneContent,
  queryContent,
  delContent,
  addContent,
  updateContent,
  checkContent
}
