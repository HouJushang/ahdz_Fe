import {getApi, postApi, putApi, delApi} from '../api/api'
function queryService(data){
  return postApi(`admin/listService`, data)
}
function queryOneService(data){
  return getApi('admin/getOneService', data)
}
function delService(id){
  return delApi(`admin/service`, {id: id})
}
function addService(data){
  return postApi(`admin/service`, data)
}
function updateService(data){
  return putApi(`admin/service`, data)
}
export {
  queryService,
  queryOneService,
  delService,
  addService,
  updateService
}
