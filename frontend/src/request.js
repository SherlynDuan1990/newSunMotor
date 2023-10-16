import axios from 'axios'
import Cookies from 'js-cookie'

// 创建 axios 实例
const service = axios.create({
  baseURL: '', 
  withCredentials:true
})


// request interceptor
service.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token) {
    config.headers[ 'X-Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
},(error) => {
  return Promise.reject(error)
})


export {
  service as axios
}