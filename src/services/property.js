import request from '@/utils/request';

// 获取所有房源信息
// export async function getProperty() {
//   return request('/back/houseMessage');
// }

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
  return request(`/back/houseManage?house_id=${id}`)
}
