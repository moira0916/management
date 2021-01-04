import request from '@/utils/request'

export function getExamAdd(data) {
  return request({
    url: '/interview/add/',
    method: 'post',
    data
  });
}
export function getExamList(projectId) {
  return request({
    url: '/interview/listByProject',
    method: 'get',
    params: { projectId }
  });
}

export function getExamDetail(id){
  return request({
    url: '/interview/'+id+'/show',
    method: 'get'
  })
}
export function getExamUpdate(data){
  return request({
    url: '/interview/update',
    method: 'post',
    data
  })
}
export function getExamDelete(id){
  return request({
    url: '/interview/'+id+'/delete',
    method: 'get'
  })
}
export function getInviewListDetails(params){
  return request({
    url: '/interview/listDetails',
    method: 'get',
    params
  })
}

export function intViewAddEmployee(data){
  return request({
    url: '/interview/addEmployee',
    method: 'POST',
    data
  })
}

export function intViewDeleteEmployee(data){
  return request({
    url: '/interview/deleteDetails',
    method: 'POST',
    data
  })
}
export function interViewScores(projectId) {
  return request({
    url: '/interview/scores',
    method: 'get',
    params: { projectId }
  });
}
export function updateScoreSort(data) {
  return request({
    url: '/interview/updateScoreSort',
    method: 'POST',
    data
  });
}
export function interViewScore(params) {
  return request({
    url: '/interview/score',
    method: 'get',
    params
  });
}
