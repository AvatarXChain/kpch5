import { request } from '../api/api';

export const fetchTokenRankList = params => {
  return request({
    method: 'get',
    url: `token/rank/all?&current_page=${params.currentPage}&per_page=${params.perPage}`
  });
};

export const fetchTokenRankToday = params => {
  return request({
    method: 'get',
    url: 'token/rank/today'
  });
};

export const fetchTokenTopToday = params => {
  return request({
    method: 'get',
    url: 'token/top/today'
  });
};

export const fetchTokenCountAll = params => {
  return request({
    method: 'get',
    url: 'token/count/all'
  });
};

export const fetchTokenCountDays = params => {
  return request({
    method: 'get',
    url: 'token/count/days'
  })
}
