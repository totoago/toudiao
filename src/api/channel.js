import request from '@/utils/request.js'
// 获取全部频道列表项
export const getAllchannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 修改频道
export const addChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除频道
export const delChannel = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
