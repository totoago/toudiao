import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendsms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息

export const getlist = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: { Authorization: `Bearer ${store.state.user.token}` }
    /*  headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`
    } */
  })
}
// 获取频道列表
export const getUserchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
