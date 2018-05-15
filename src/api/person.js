import {getApi, postApi, putApi, delApi} from '../api/api'
// function querycompany(data){
//   return getApi('admin/company', data)
// }
// function delcompany(data){
//   return delApi('admin/company', data)
// }
// function addcompany(data){
//   return postApi('admin/company', data)
// }
// function updatecompany(data){
//   return putApi('admin/company', data)
// }
function getPersonById(id) {
  return getApi(`admin/personById/${id}`)
}
function setPerson(id, data){
  return postApi(`admin/person/${id}`, data)
}
function getPersonList(data){
  return postApi('admin/personList', data)
}
export {
  getPersonById,
  setPerson,
  getPersonList
}
