import request from '@/utils/request';

// 提交订单
export const pushOrder = function (data) {
  return request.post('/back/order/', {
    data,
  });
};

// 取消订单
export const cancelOrder = function (id) {
  return request.delete(`/back/order/${id}`);
};

// 付款
export const payForOrder = function (id, orderCode) {
  return request('/back/order/pay', {
    params: {
      id,
      orderCode,
    },
  });
};

// 返回url
export const returnUrl = function () {
  return request('/back/order/returnUrl');
};
