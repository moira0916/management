import request from '@/utils/request'

export function GetUserList() {
  return request({
    url: '/user/list.html',
    method: 'get'
  })
}

export function ModifyUser(data) {
  return request({
    url: '/user/modify.html',
    method: 'post',
    data
  })
}

export function DeleteUser(data) {
  return request({
    url: '/user/delete.html',
    method: 'post',
    data
  })
}

export function ResetPassword(data) {
  return request({
    url: '/user/reset_password.html',
    method: 'post',
    data
  })
}

export function GetRolesAndCheck(data) {
  return request({
    url: '/user/roles_and_check.html',
    method: 'get',
    params: data
  })
}

export function SetUserRoles(data) {
  return request({
    url: '/user/user_roles_set.html',
    method: 'post',
    data
  })
}

export function RestoreUser(data) {
  return request({
    url: '/user/restore.html',
    method: 'get',
    params: data
  })
}
