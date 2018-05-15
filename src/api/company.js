import {getApi, postApi, putApi, delApi} from '../api/api'
function getcompanyById(id) {
  return getApi(`admin/companyById/${id}`)
}
function setCompany(id, data){
  return postApi(`admin/company/${id}`, data)
}
function queryCompanyList(data){
  return postApi('admin/companyList', data)
}
export {
  getcompanyById,
  setCompany,
  queryCompanyList
}
