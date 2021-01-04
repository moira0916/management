import request from '@/utils/request'

export function commonUpload(data,onUploadProgress){
  return request({
    url: '/upload/file',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress
  })
}
