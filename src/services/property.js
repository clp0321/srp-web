import request from '@/utils/request';

// 获取所有房源信息
export async function getProperty() {
  return request('/houseMessage');
}

// 添加房源
export async function addProperty(data) {
  return request.post('/houseMessage', {
    data,
  });
}

// 修改房源
export async function updateProperty(data) {
  return request.put('/houseMessage', {
    data,
  });
}

// 删除房源
export async function deleteProperty() {
  return request.delete('/user', {
    params: {
      id,
    },
  });
}
