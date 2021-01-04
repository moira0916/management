import request from '@/utils/request'

export function allCountries() {
  return request({
    url: '/auth/allCountries',
    method: 'get'
  });
}

export function myRegister(data){
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}
