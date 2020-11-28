import request from '@/utils/request';

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
  return request.post('/users/login', {
    params: data,
  });
}

// 用户注册
export async function userAdd(data) {
  return request.post('/user/register', {
    data,
  });
}

// 删除用户
export async function deleteUser(id) {
  return request.delete('/user', {
    params: {
      id,
    },
  });
}

// 修改用户
export async function updateUser(data) {
  return request.put('/user', {
    method: 'PUT',
    data,
  });
}

// 获取用户所有信息
export async function getAllUser() {
  return request('/user/users');
}

// 查询用户是否存在
export async function findSomeOne(param) {
  return request(`/user/username`, {
    params: {
      userName: param,
    },
  });
}

// 获取登陆用户信息
export async function getCurrentUser(param) {
  return request(`/user`, {
    params: {
      userName: param,
    },
  });
}
