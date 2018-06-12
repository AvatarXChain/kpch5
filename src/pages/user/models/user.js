
import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    userInfo: {
      code: 0,
      data: '',
      message: '',
    },
    userCollectDaysList: {
      code: 0,
      data: '',
      message: '',
    },
  },
  reducers: {
    saveUserInfo(state, { payload: userInfo }) {
      return { ...state, userInfo };
    },
    saveUserCollectDaysList(state, { payload: userCollectDaysList }) {
      return { ...state, userCollectDaysList };
    },
  },
  effects: {
    *fetchUserProfile({ payload: params }, { call, put }) {
      const { code, data, message } = yield call(userService.fetchUserProfile, params);
      yield put({
        type: 'saveUserInfo',
        payload: { code, data, message }
      })
    },
    *fetchUserCollectDaysList({ payload: params }, { call, put }) {
      const { code, data, message } = yield call(userService.fetchUserCollectDaysList, params);
      
      if (code === 1) {
        data.map(async item => {
          const { code: childCode, data: childData } = await userService.fetchUserCollectListByIDs({
            ids: item.ids,
          });
          item.children = childData;
        });
      }
      yield put({
        type: 'saveUserCollectDaysList',
        payload: { code, data, message }
      })
    },
  },
  subscriptions: {
    indexSubscriber({ dispatch, history }) {
      const fetchJsConfig = () => {
        const url = encodeURIComponent(window.location.href.split('#')[0]);
        dispatch({
          type: 'wechat/fetchJSConfig',
          payload: {
            url
          }
        });
      }

      const fetchUploadToken = () => {
        dispatch({
          type: 'oss/fetchUploadToken'
        })
      }

      const fetchUserProfile = () => {
        dispatch({
          type: 'fetchUserProfile'
        })
      }

      const fetchInviteList = (perPage = 10, currentPage = 1) => {
        dispatch({
          type: 'invite/fetchList',
          payload: {
            perPage: 20,
            currentPage: 1,
          }
        })
      }

      const fetchInviteImage = (perPage = 10, currentPage = 1) => {
        dispatch({
          type: 'invite/fetchImage',
        });
      }

      const fetchTokenCountAll = () => {
        dispatch({
          type: 'token/fetchTokenCountAll',
        })
      }


      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          fetchUserProfile();
          fetchJsConfig();
          fetchTokenCountAll();
          fetchUploadToken();
          fetchInviteList();
          fetchInviteImage();
        }
      });
    },
    incomeSubscriber({ dispatch, history }) {
      const fetchUserCollectDaysList = () => {
        dispatch({
          type: 'fetchUserCollectDaysList',
          payload: {
            perPage: 20,
            currentPage: 1,
          }
        })
      }

      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/income') {
          fetchUserCollectDaysList();
        }
      });
    },
  },
};