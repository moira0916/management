import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/role',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: "/auth/register",
    method: "post",
    data
  })
}

export function getUserList() {
  return request({
    url: '/user/list/waitAudit',
    method: 'get'
  })
}

export function toUserPass(username) {
  return request({
    url: '/user/pass',
    method: 'get',
    params:{ username }
  })
}

export function userAll(params) {
  return request({
    url: '/user/all',
    method: 'get',
    params
  })
}
export function userdelete(data) {
  return request({
    url: "/user/delete",
    method: "post",
    data
  })
}
export function userAdd(data) {
  return request({
    url: "/user/add",
    method: "post",
    data
  })
}
export function userUpdate(data) {
  return request({
    url: "/user/update",
    method: "post",
    data
  })
}
export function userDetail(username) {
  return request({
    url: '/user/detail',
    method: 'get',
    params:{username}
  })
}

