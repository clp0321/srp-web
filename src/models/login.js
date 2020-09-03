import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, userLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      const { data } = response;
      console.log(data)
      if (data) {
        yield put({
          type: 'changeLoginStatus',
          payload: {currentAuthority: data.userName, status: 'ok'}
        })
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
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority: 'guest', status: 'error' }
        })
      }
    },

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
  },
};
export default Model;
