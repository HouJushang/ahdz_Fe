import {getApi, postApi, putApi, delApi} from '../api/api'
function queryProduct(data){
  return postApi(`admin/listProduct`, data)
}
function queryOneProduct(data){
  return getApi('admin/getOneProduct', data)
}
function delProduct(id){
  return delApi(`admin/product`, {id: id})
}
function addProduct(data){
  return postApi(`admin/product`, data)
}
function updateProduct(data){
  return putApi(`admin/product`, data)
}
function checkProduct(data){
  return putApi(`admin/checkProduct`, data)
}
export {
  queryProduct,
  queryOneProduct,
  delProduct,
  addProduct,
  updateProduct,
  checkProduct
}
