import {getApi, postApi, putApi, delApi} from '../api/api'
function queryPosition(data){
  return getApi('admin/position', data)
}
function delPosition(data){
  return delApi('admin/position', data)
}
function addPosition(data){
  return postApi('admin/position', data)
}
function updatePosition(data){
  return putApi('admin/position', data)
}
function queryPositionContent(id, data){
  return getApi(`admin/positionContent/${id}`, data)
}
function updatePositionContent(data){
  return putApi(`admin/positionContent`, data)
}
export {
  queryPosition,
  delPosition,
  addPosition,
  updatePosition,
  queryPositionContent,
  updatePositionContent
}
