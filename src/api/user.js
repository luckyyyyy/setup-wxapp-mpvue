/**
 * This file is part of the Muggle.
 * @copyright Copyright (c) 2018 Hangzhou Muggle Network Technology Co., Ltd.
 * @author William Chan <root@williamchan.me>
 */

import { http } from '@/api';

/**
 * 获取当前用户 profile
 * @return {Promise}
*/
export const getUserProfile = () => {
  return http.get('user/profile');
};

/**
 * 获取用户关注信息
 * @param {string} scenario
 * @return {Promise}
 */
export const getFollow = (scenario) => {
  return http.get(`user/profile/follow/${scenario}`);
};
