import request from '@/utils/request'
export const getLenovo = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
