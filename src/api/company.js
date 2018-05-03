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
function getcompanyById(id) {
  return getApi(`admin/companyById/${id}`)
}
function setCompany(id, data){
  return postApi(`admin/company/${id}`, data)
}
export {
  getcompanyById,
  setCompany
}
