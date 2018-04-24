import axios from 'axios'
import {baseUrl} from '../config'
export default function () {
  const url = baseUrl + 'captcha'
  return axios.get(url, {
    withCredentials: true
  })
}
