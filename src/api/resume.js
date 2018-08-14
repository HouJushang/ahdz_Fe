import {getApi, postApi, putApi, delApi} from '../api/api'
function queryResume(data){
  return postApi(`admin/listResume`, data)
}
function queryOneResume(data){
  return getApi('admin/getOneResume', data)
}
function delResume(id){
  return delApi(`admin/resume`, {id: id})
}
function addResume(data){
  return postApi(`admin/resume`, data)
}
function updateResume(data){
  return putApi(`admin/resume`, data)
}
function updateResumeAll(data){
  return putApi(`admin/resumeAll`, data)
}
export {
  queryResume,
  queryOneResume,
  delResume,
  addResume,
  updateResume,
  updateResumeAll
}
