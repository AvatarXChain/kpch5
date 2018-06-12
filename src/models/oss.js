
import * as ossService from '../services/oss';

export default {

  namespace: 'oss',

  state: {
    uploadToken: {
      code: 0,
      data: '',
      message: '',
    },
  },

  reducers: {
    saveUploadToken(state, { payload: uploadToken }) {
      return { ...state, uploadToken };
    },
  },

  effects: {
    *fetchUploadToken({ payload: params }, { call, put }) {
      console.log(params)
      const { code, data, message } = yield call(ossService.fetchUploadToken, params);
      yield put({
        type: 'saveUploadToken',
        payload: { code, data, message }
      })
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
