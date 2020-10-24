import request from '@/utils/request';

// 区块信息状态
export async function blockStatus(hash) {
  return request(`/back/chain/block/${hash}`);
}

// 合约信息查询
export async function queryContract(address) {
  return request(`/back/chain/contract/${address}`);
}

// 混合查询
export async function fixQuery(hex) {
  return request(`/back/fuzzy/${hex}`);
}

// 查询状态信息
export async function queryInfo() {
  return request('/back/chain/info');
}

// 查询交易信息和回执
export async function queryTransaction(hash) {
  return request(`/back/chain/transaction/${hash}`)
}
