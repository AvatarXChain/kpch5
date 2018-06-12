import router from 'umi/router';
import * as authService from '../services/auth';

export default {

  namespace: 'auth',

  state: {
    loginLoading: false,
    authenticated: false,
    accessToken: null,
    userInfo: null,
  },

  reducers: {
    saveLoginLoading(state, { payload: loginLoading }) {
      return { ...state, loginLoading };
    },
    saveAuthenticated(state, { payload: authenticated }) {
      return { ...state, authenticated };
    },
    saveAccessToken(state, { payload: accessToken }) {
      return { ...state, accessToken };
    },
    saveUserInfo(state, { payload: userInfo }) {
      return { ...state, userInfo };
    },
  },

  effects: {
    *loginWechat({ payload: params }, { call, put }) {
      yield put({ type: 'saveLoginLoading', payload: true });
      const { code, data } = yield call(authService.loginWechat, params);
      if (code === 1) {
        yield put({ type: 'saveLoginLoading', payload: false });

        yield put({ type: 'saveAuthenticated', payload: true });
        yield put({ type: 'saveUserInfo', payload: data.user_info });
        yield put({ type: 'saveAccessToken', payload: data.access_token });

        localStorage.setItem('kpc_access_token', data.access_token);

        router.push('/user');
      }
    },
    *signOut({ payload: params }, { call, put }) {
      yield put({ type: 'saveAuthenticated', payload: false });
      yield put({ type: 'saveUserInfo', payload: null });
      yield put({ type: 'saveAccessToken', payload: null });

      localStorage.removeItem('kpc_access_token');

      router.push('/');
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
