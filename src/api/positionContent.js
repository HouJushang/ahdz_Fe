import {getApi, postApi, putApi, delApi} from '../api/api'
function queryPositionContent(data){
  return getApi('admin/positionContent', data)
}
function delPositionContent(data){
  return delApi('admin/positionContent', data)
}
function addPositionContent(data){
  return postApi('admin/positionContent', data)
}
function updatePositionContent(data){
  return putApi('admin/positionContent', data)
}
export {
  queryPositionContent,
  delPositionContent,
  addPositionContent,
  updatePositionContent
}
