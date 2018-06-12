import { request } from '../../../api/api';

export const fetchUserProfile = params => {
  return request({
    method: 'get',
    url: 'user/profile',
  });
}

/**
 * 获取数据列表
 * @param  {[type]} params [description]
 * @return {[type]} [description]
 */
export const fetchUserCollectDaysList = params => {
  return request({
    method: 'get',
    url: `user/collect_resource/days?&current_page=${params.currentPage}&per_page=${params.perPage}`,
  });
};

/**
 * 获取数据列表
 * @param  {[type]} params [description]
 * @return {[type]} [description]
 */
export const fetchUserCollectListByIDs = params => {
  return request({
    method: 'get',
    url: `user/collect_resource/ids/${params.ids}`,
  });
};

export const fetchUserCollectItem = params => {
  return request({
    method: 'get',
    url: `user/collect_resource/${params.id}`,
  });
};
