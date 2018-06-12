import axios from 'axios';
import router from 'umi/router';
import { checkAuth, signOut } from '../services/auth';

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 需要同步获取到accessToken，添加至header中
    const accessToken = checkAuth();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response)
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          signOut();
          router.push('/');
          break;

        case 505:
          // 更新token
          const { data } = error.response.data;
          localStorage.setItem('kpc_access_token', data);
          break;

        default:
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  }
);

export default axios;
