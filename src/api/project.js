import request from '@/utils/request'

export function getProjectByCode(code) {
  return request({
    url: '/project/'+code,
    method: 'get'
  });
}
export function projectDetail(code){
  return request({
    url: '/contract/'+code+'/detail',
    method: 'get'
  })
}

export function projectDelete(code){
  return request({
    url: '/project/'+code+'/delete',
    method: 'get'
  })
}
export function projectAdd(data){
  return request({
    url: '/project/add',
    method: 'post',
    data
  })
}
export function projectUpdate(data){
  return request({
    url: '/project/'+data.id+'/update',
    method: 'post',
    data
  })
}
export function projectDetailAdd(data){
  return request({
    url: '/project/detail/add',
    method: 'post',
    data
  })
}
export function projectDetailUpdate(data){
  return request({
    url: '/project/detail/'+data.id+'/update',
    method: 'post',
    data
  })
}
export function projectDetailDelete(id){
  return request({
    url: '/project/detail/'+id+'/delete',
    method: 'get'
  })
}