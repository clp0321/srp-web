import request from '@/utils/request';

/** 获取发布需求 */
export const getDemands = (id) => {
  return request(`/back/demand?user_id=${id}`);
};

/** 添加发布信息 */
export const addDemands = (data) => {
  return request.post('/back/demand', {
    data,
  });
};

/** 修改发布信息 */
export const updateDemands = (data) => {
  return request.put('/back/demand', {
    data,
  });
};

/** 删除发布信息 */
export const deleteDemand = (id) => {
  return request.delete(`/back/demand/?id=${id}`);
};