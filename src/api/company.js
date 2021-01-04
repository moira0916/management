import request from '@/utils/request'

export function companyList(status){
  return request({
    url: '/company/list/'+status,
    method: 'get'
  })
}
export function companyPass(code,pass) {
  return request({
    url: '/company/pass/'+code,
    method: 'get',
    params: { pass }
  })
}
export function companycommit(data) {
  return request({
    url: '/company/commit',
    method: 'post',
    data
  })
}


export function companyShow(companyCode) {
  return request({
    url: '/company/show',
    method: 'get',
    params:{ companyCode }
  })
}
export function employeeList(){
  return request({
    url: '/employee/list',
    method: 'get'
  })
}
export function employeeAdd(data) {
  return request({
    url: '/employee/add',
    method: 'post',
    data
  })
}

export function employeeUpdate(data) {
  return request({
    url: '/employee/'+data.code+'/update',
    method: 'post',
    data
  })
}

export function employeeDetail(code){
  return request({
    url: '/employee/'+code+'/show',
    method: 'get'
  })
}

export function employeeDelete(code){
  return request({
    url: '/employee/'+code+'/delete',
    method: 'get'
  })
}
export function employeeListByInterview(interviewId){
  return request({
    url: '/employee/listByInterview',
    method: 'get',
    params:{ interviewId }
  })
}
