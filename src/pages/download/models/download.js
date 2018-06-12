
export default {
  namespace: 'download',
  state: {
  },
  reducers: {
  },
  effects: {
  },
  subscriptions: {
    inviteSubscriber({ dispatch, history }) {
      const fetchJsConfig = () => {
        const url = encodeURIComponent(window.location.href.split('#')[0]);
        dispatch({
          type: 'wechat/fetchJSConfig',
          payload: {
            url
          }
        });
      }

      // const fetchUserProfile = () => {
      //   dispatch({
      //     type: 'user/fetchUserProfile'
      //   })
      // }

      return history.listen(({ pathname, query }) => {
        if (pathname === '/download') {
          fetchJsConfig();
          // fetchUserProfile();
        }
      });
    },
  },
};