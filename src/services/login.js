import request from '@/utils/request';
import qs from 'qs';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

// 用户登陆
export async function userLogin(data) {
  return request('/user/login', {
    method: 'POST',
    data,
    requestType: 'form'
  });
}

// 用户注册
export async function userRegister(data) {
  return request('/user/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(data),
  });
}

// 删除用户
export async function deleteUser(params) {
  return request('/user/deleteUser', {
    method: 'DELETE',
    params,
  });
}

// 修改用户
export async function updateUser(params) {
  return request('/user/updateUser', {
    method: 'PUT',
    params,
  });
}

// 获取用户所有信息
export async function getAllUser() {
  return request('/user/getAllUser');
}
