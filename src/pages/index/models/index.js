import router from 'umi/router';
import { checkAuth } from '../../../services/auth';

export default {
  namespace: 'index',
  state: {
    isJoinedIn: null,
    userInfo: null,
    userJoin: {
      code: 0,
      data: '',
      message: '',
    },
    loginLoading: false,
  },
  reducers: {
    updateUserInfo(state, { payload: userInfo }) {
      return { ...state, userInfo };
    },
    updateLoginLoading(state, { payload: loginLoading }) {
      return { ...state, loginLoading };
    },
    saveUserJoin(state, { payload: userJoin }) {
      return { ...state, userJoin };
    },
    saveUserJoinedIn(state, { payload: { isJoinedIn } }) {
      return { ...state, isJoinedIn };
    },
  },
  effects: {
    // *remove({ payload: id }, { call, put, select }) {
    //   yield call(indexService.remove, id);
    //   const page = yield select(state => state.index.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
    // *patch({ payload: { id, values } }, { call, put, select }) {
    //   yield call(indexService.patch, id, values);
    //   const page = yield select(state => state.index.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
    // *join({ payload: { context, values } }, { call, put, select }) {
    //   const { code, data, message } = yield call(indexService.join, values);
    //    yield put({
    //     type: 'saveUserJoin',
    //     payload: { code, data, message },
    //   });
    //   yield put({
    //     type: 'saveUserJoinedIn',
    //     payload: {
    //       isJoinedIn: code === 1,
    //     },
    //   });
    // },
  },
  subscriptions: {
    indexSubscriber ({ dispatch, history }) {
      const fetchJsConfig = () => {
        const url = encodeURIComponent(window.location.href.split('#')[0]);
        dispatch({
          type: 'wechat/fetchJSConfig',
          payload: {
            url
          }
        });
      }

      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          fetchJsConfig();
          const accessToken = checkAuth();
          // 判断用户是否登录
          // 未登录: 执行微信登录，绑定账号
          if (accessToken) {
            router.push('/user');
          } else {
            console.log('code&invite_id:')
            const { code, invite_id } = query;
            console.log(code, invite_id)
            if (code) {
              // 通过code获取用户信息
              dispatch({
                type: 'wechat/fetchAuthUser',
                payload: {
                  code
                }
              });
            } else {
              let redirect = 'https://kpc.markartisan.com/';
              if (invite_id) {
                redirect += `?invite_id=${invite_id}`;
              }
              // 未授权，跳转至授权页面，传redirect
              dispatch({
                type: 'wechat/fetchAuthURL',
                payload: {
                  redirect
                }
              });
            }
          }
        }
      });
    },
  },
};
