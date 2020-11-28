import { stringify } from 'querystring';
import { history } from 'umi';
import { userLogin, userAdd } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    registerStatus: undefined,
  },
  effects: {
    // 用户登入
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      const { msg } = response;
      if (msg === '登录成功！') {
        // 将返回登入用户信息存入缓存中
        localStorage.setItem('name', payload.username);
        
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/srp/rent';
            return;
          }
        }
        history.replace('/srp/rent');
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority: 'guest', status: 'error' },
        });
      }
    },
    // 用户注册
    *register({ payload }, { call, put }) {
      const response = yield call(userAdd, payload);
      if (response && response.msg === 'SUCCESS') {
        yield put({
          type: 'changeRegisterStatus',
          payload: { registerStatus: true },
        });
        return true;
      } else {
        return false;
      }
    },

    // 退出
    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/client/logining' && !redirect) {
        history.replace({
          pathname: '/client/logining',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status };
    },
    changeRegisterStatus(state, { payload }) {
      return { ...state, registerStatus: payload.registerStatus };
    },
  },
};
export default Model;
