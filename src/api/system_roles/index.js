import request from '@/utils/request'

export function GetRolesList() {
  return request({
    url: '/role/list.html',
    method: 'get'
  })
}

export function ModifyRoleList(data) {
  return request({
    url: '/role/modify.html',
    method: 'post',
    data
  })
}

export function DeleteRoleList(data) {
  return request({
    url: '/role/delete.html',
    method: 'post',
    data
  })
}

// 根据角色ID获取角色用户信息
export function GetRoleUsers(data) {
  return request({
    url: '/role/role_user.html',
    method: 'get',
    params: data
  })
}

// 角色添加用户
export function RoleAddUser(data) {
  return request({
    url: '/role/add_role_user.html',
    method: 'post',
    data
  })
}

// 角色删除用户
export function RoleDelUser(data) {
  return request({
    url: '/role/del_role_user.html',
    method: 'post',
    data
  })
}
