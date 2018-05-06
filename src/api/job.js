import {getApi, postApi, putApi, delApi} from '../api/api'
function queryJob(data){
  return postApi(`admin/listJob`, data)
}
function queryOneJob(data){
  return getApi('admin/getOneJob', data)
}
function delJob(id){
  return delApi(`admin/job`, {id: id})
}
function addJob(data){
  return postApi(`admin/job`, data)
}
function updateJob(data){
  return putApi(`admin/job`, data)
}
export {
  queryJob,
  queryOneJob,
  delJob,
  addJob,
  updateJob
}
