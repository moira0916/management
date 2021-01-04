import request from '@/utils/request'

export function allContract() {
  return request({
    url: '/contract/list',
    method: 'get'
  });
}
export function contractDetail(code){
  return request({
    url: '/contract/'+code+'/detail',
    method: 'get'
  })
}

export function contractDelete(code){
  return request({
    url: '/contract/'+code+'/delete',
    method: 'get'
  })
}
export function contractAdd(data){
  return request({
    url: '/contract/insert',
    method: 'post',
    data
  })
}
export function contractUpdate(data){
  return request({
    url: '/contract/'+data.code+'/update',
    method: 'post',
    data
  })
}
// export function myRegister(data){
//   return request({
//     url: '/auth/register',
//     method: 'post',
//     data
//   })
// }
