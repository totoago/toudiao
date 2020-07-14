import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  // console.log(user)

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
// 响应拦截器
// axios.interceptors.response.use(ret => {
//   return ret
// })
export default request
