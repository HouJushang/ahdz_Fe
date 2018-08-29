import {getApi, postApi, putApi, delApi} from '../api/api'
import qs from 'qs'

function queryAccessory(data) {
  console.log(data)
  return getApi('admin/accessory', data, {
    'paramsSerializer': function (params) {
      return qs.stringify(params, {encode: false})
    }
  })
}

function delAccessory(data) {
  return delApi('admin/accessory', data)
}

function addAccessory(data) {
  return postApi('admin/accessory', data)
}

function updateAccessory(data) {
  return putApi('admin/accessory', data)
}

export {
  queryAccessory,
  delAccessory,
  addAccessory,
  updateAccessory,
}
