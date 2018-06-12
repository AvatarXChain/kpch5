import { request } from '../api/api';

/**
 * 获取任务数据上传的 OSS Uptoken
 * @return null
 */
export const fetchUploadToken = () => {
  return request({
    method: 'get',
    url: 'collect_task/1/resource/uptoken',
  });
};

export const uploadImage = (file, token) => {
  let formData = new FormData();
  formData.append('OSSAccessKeyId', token.accessid);
  formData.append('success_action_status', '200');
  formData.append('policy', token.policy);
  formData.append('signature', token.signature);
  formData.append('key', token.key);
  formData.append('prefix', token.key_prefix);
  formData.append('callback', token.callback);
  formData.append('file', file);

  return fetch(`${token.host}`, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });
}
