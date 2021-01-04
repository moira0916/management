import request from '@/utils/request'

export function getAudienceVerify(interviewId) {
  return request({
    url: '/live/audienceVerify',
    method: 'get',
    params:{interviewId}
  });
}
export function getshowEmployee(params) {
  return request({
    url: '/live/showEmployee',
    method: 'get',
    params
  });
}