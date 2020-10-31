import request from '@/utils/request';
import qs from 'qs';

// 条件查询房源信息
export async function findPropertyByItems(data) {
  return request(`/back/houseManage/choice?${qs.stringify(data)}`);
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

// 添加房源
export async function addEstate(data) {
  return request.post('/back/houseManage', {
    data,
  });
}

// 获取全部房源信息
export async function getProperty() {
  return request('/back/houseManage/houseManages');
}

// houst_id获取房源详情信息
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
  return request.put(`/back/apply/refuse?Id=${data}`);
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

// 根据房源id查询图片集合
export async function getPicListById(house_id) {
  return request(`/back/housePic/url?house_id=${house_id}`);
}

// 删除特定图片
export async function deletePicById() {
  return request.delete();
}

// 获取系统生成houseID
export async function getHouseId(id) {
  return request(`/back/houseManage/houseId?userId=${id}`);
}
