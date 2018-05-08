/**
 * This file is part of the Muggle.
 * @copyright Copyright (c) 2018 Hangzhou Muggle Network Technology Co., Ltd.
 * @author William Chan <root@williamchan.me>
 */
/* eslint-disable no-await-in-loop */
import WXP from 'minapp-api-promise';
import { http } from '@/api';

export const clearAuthorization = () => WXP.removeStorageSync('tokens');
export const getAuthorization = () => WXP.getStorageSync('tokens');
export const setAuthorization = token => WXP.setStorageSync('tokens', token);

/**
 * 换取token
 * @param {string} code wx.login 返回的授权码
 * @param {string} iv 由 wx.getUserInfo({withCredentials:true}) 返回
 * @param {string} encryptedData 加密后的敏感数据，同上
 * @return {Promise}
 */
export const getToken = (code, iv, encryptedData) => {
  return http.post('user/token', {
    wxapp: {
      scenario: 'zhongce_wxapp',
      code,
      iv,
      encryptedData,
    },
  }, { ignoreToken: true });
};

/**
 * 获取用户授权 assert
 * @return {Promise}
 */
let _getUserInfo = null;
export const getUserInfo = () => {
  if (!_getUserInfo) {
    _getUserInfo = new Promise(async (resolve, reject) => {
      while (!getAuthorization()) {
        try {
          const data = await WXP.login();
          const set = await WXP.getSetting();
          if (set.authSetting['scope.userInfo'] === false) {
            throw Error('scope userInfo disabled');
          }
          const user = await WXP.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
          });
          const res = await getToken(data.code, user.iv, user.encryptedData);
          await setAuthorization(res.data.access_token);
          _getUserInfo = null;
          resolve();
        } catch (e) {
          const set = await WXP.getSetting();
          if (set.authSetting['scope.userInfo'] === false) {
            await WXP.showModal({
              title: '需要授权',
              content: '请允许授权用户基础信息',
              showCancel: false,
            });
            await WXP.openSetting();
          }
          // @todo 换 token 的时候出现了错误需要处理
        }
      }
    });
  }
  return _getUserInfo;
};
