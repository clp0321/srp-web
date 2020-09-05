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
    requestType: 'form',
  });
}

// 用户注册
export async function userAdd(data) {
  return request('/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
  });
}

// 删除用户
export async function deleteUser(params) {
  return request('/user/deleteUser', {
    method: 'DELETE',
    data: params,
  });
}

// 修改用户
export async function updateUser(params) {
  return request('/user/updateUser', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
  });
}

// 获取用户所有信息
export async function getAllUser() {
  return request('/user/getAllUser');
}

// 查询用户是否存在
export async function findSomeOne(param) {
  return request(`/user/findUserName`, {
    method: 'POST',
    params: {
      userName: param
    }
  });

}
