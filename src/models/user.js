import { queryCurrent, query as queryUsers } from '@/services/user';
import { getCurrentUser } from '@/services/login';
import { getAuthority } from '@/utils/authority';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const resp = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: resp,
      });
      // const authority = getAuthority();
      // if (authority) {
      //   const resp = yield call(getCurrentUser);
      //   yield put({
      //     type: 'saveCurrentUser',
      //     payload: resp,
      //   });
      // }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
