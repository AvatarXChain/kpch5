
import * as tokenService from '../services/token';

export default {

  namespace: 'token',

  state: {
    tokenCountAll: {
      code: 0,
      data: null,
      message: null,
    },
  },

  reducers: {
    saveTokenCountAll(state, { payload: tokenCountAll }) {
      return { ...state, tokenCountAll };
    },
  },

  effects: {
    *fetchTokenCountAll({ payload: params }, { call, put }) {
      const { code, data, message } = yield call(tokenService.fetchTokenCountAll, params);
      yield put({
        type: 'saveTokenCountAll',
        payload: { code, data, message }
      });
    },
    *signOut({ payload: params }, { call, put }) {
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
