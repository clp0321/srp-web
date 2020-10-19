import request from '@/utils/request';

// 条件查询房源信息
export async function findPropertyByItems() {
  return request('/back/houseManage/choice')
}

// 添加房源
export async function addProperty(data) {
  return request.post('/back/houseManage', {
    data,
  });
}

// 修改房源
export async function updateProperty(data) {
  return request.put('/back/houseMessage', {
    data,
  });
}

// 添加房产
export async function addEstate(data) {
  return request.post('/back/houseManage', {
    data,
  });
}

// 获取房产存证信息
export async function getProperty() {
  return request('/back/houseManage/houseManages');
}

// houst_id产看具体存证信息
export async function getHouseDetail(id) {
  return request(`/back/houseManage?house_id=${id}`);
}

// 申请看房
export async function applyHouse(data) {
  return request.post('/back/apply', {
    requestType: 'form',
    data,
  });
}

// 同意看房
export async function agreeApply(data) {
  return request.put('/back/apply/accept', {
    requestType: 'form',
    data,
  });
}

// 拒绝看房
export async function refuseApply(data) {
  return request.put('/back/apply/refuse', {
    data,
  });
}

// 根据房东姓名查询需要处理的申请看房信息
export async function getHander(name) {
  return request(`/back/apply/handle?houserName=${name}`);
}

// 根据房东姓名查询处理完成的申请看房信息
export async function getHouser(name) {
  return request(`/back/apply/houser?houserName=${name}`);
}

// 根据用户名查询已申请房源
export async function getApply(user) {
  return request(`/back/apply/user?userName=${user}`);
}

// 根据用户名查询已同意请求
export async function getUserAccept(user) {
  return request(`/back/apply/userAccept?userName=${user}`);
}
