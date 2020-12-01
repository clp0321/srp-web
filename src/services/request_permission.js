import request from '@/utils/request';
/** 请求路径 */

// 根据id删除请求路径
export async function deleteRequest(rid) {
  return request.delete(`/users/request/${rid}`);
}

// 添加请求路径
export async function addRequest(data) {
  return request.post('/users/request/addRequestPath', {
    params: data
  });
}

// 为权限分配url
export async function assignRequest(data) {
  return request.post('/users/request/assignRequestPath', {
    data
  });
}

// 根据id删除分配权限
export async function delRequestPermission(rpid) {
  return request.delete(`/users/request/delRequestPermission/${rpid}`);
}

// 获取全部请求路径
export async function getAllrequest({ pageNum, pageSize }) {
  return request('/users/request/requests', {
    params: {
      pageNum,
      pageSize,
    },
  });
}
// 查看请求路径（模糊查询）
export async function getRequestByUrl(url) {
  return request('/users/request/getRequestsByUrl', {
    params: url
  })
}

// 修改请求路径
export async function updateRequest(data) {
  return request.put('/users/request/updateRequestPath', {
    params: {...data},
  });
}

/** 权限管理 */

// 根据id删除权限信息
export async function deletePermission(aid) {
  return request.delete(`/users/permission/${aid}`);
}

// 添加权限
export async function addPermission({ permissionCode, permissionName }) {
  return request.post('/users/permission/addPermission', {
    params: { permissionCode, permissionName },
  });
}

// 为角色分配权限
export async function assignPermission(data) {
  return request.post('/users/permission/assignPermission', {
    data,
  });
}

// 根据id删除分配权限
export async function delRolePermission(rpid) {
  return request.delete(`/users/permission/delRolePermission/${rpid}`);
}

// 根据userid查询权限
export async function getPermission({ uid, pageNum, pageSize }) {
  return request(`/users/permission/getPermission/${uid}`, {
    params: {
      pageNum,
      pageSize,
    },
  });
}

// 分页查询权限信息
export async function getAllPermissions({ pageNum, pageSize }) {
  return request('/users/permission/Permissions', {
    params: {
      pageNum,
      pageSize,
    },
  });
}

// 修改权限
export async function updatePermission(data) {
  return request.put('/users/permission/updatePermission', {
    params: {
      ...data
    },
  });
}
