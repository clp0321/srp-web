import request from '@/utils/request';

// 登陆鉴权
export async function toLogin(data) {
  return request.post('/deviceManagement/api/login.do', {
    data,
  });
}

// 查询设备列表
export async function getDeviceList(pageNum, pageSize) {
  return request.get(`/deviceManagement/api/deviceList.do?pageNun=${pageNum}&pageSize=${pageSize}`);
}

// 查询智能锁列表
export async function getLockList() {
  return request('/deviceManagement/api/deviceList.do');
}

export async function addPermanentPasswd(data) {
  return request.post('/deviceManagement/api/permanentPassword.do', {
    data,
  });
}

// 修改永久密码
export async function updatPermanentPasswd(data) {
  return request.put('/deviceManagement/api/permanentPassword.do', {
    data,
  });
}

// 删除永久密码
export async function deletePermanentPasswd(data) {
  return request.delete('/deviceManagement/api/permanentPassword.do', {
    data,
  });
}

// 添加临时密码
export async function addTemporaryPasswd(data) {
  return request.post('/deviceManagement/api/temporaryPassword.do', {
    data,
  });
}

// 修改临时密码
export async function updateTemporaryPasswd(data) {
  return request.put('deviceManagement/api/temporaryPassword.do', {
    data,
  });
}
