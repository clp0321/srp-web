import { stringify } from 'querystring';
import { history } from 'umi';
import { notification } from 'antd';
import { userLogin, userAdd } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    registerStatus: undefined,
    currentUser: {},
  },
  effects: {
    // 用户登入
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      const { code, data, msg } = response;
      if (code === 200) {
        // 用户信息存储浏览器
        localStorage.setItem('username', data.userName);
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
        return {};
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' },
        });
        return {
          code,
          msg,
        };
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
      return { ...state, status: payload.status };
    },
    changeRegisterStatus(state, { payload }) {
      return { ...state, registerStatus: payload.registerStatus };
    },
  },
};
export default Model;
