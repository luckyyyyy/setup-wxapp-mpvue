/**
 * This file is part of the Muggle.
 * @copyright Copyright (c) 2018 Hangzhou Muggle Network Technology Co., Ltd.
 * @author William Chan <root@williamchan.me>
 */
import Vue from 'vue';
import WXP from 'minapp-api-promise';
import { clearAuthorization, getAuthorization, setAuthorization, getUserInfo } from '@/utils/authorization';

// 路由调用方法 并不优雅 需要完善的
// Vue.prototype.$router.push('/pages/index/index');

/**
 * 微信 request 基类
 * @author William Chan <root@williamchan.me>
 */
class Http {
  /**
   * @var {string} baseUrl
   */
  baseUrl = '';

  /**
   * @var {int} requestCount
   */
  requestCount = 0;

  /**
   * @var {int} timer
   */
  timer = 0;

  /**
   * 构造函数
   * @param {string} baseUrl
   */
  constructor(data) {
    Object.assign(this, data);
  }

  /**
   * 打开加载loading
   */
  openIndicator = () => {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        WXP.showLoading({ title: '数据加载中', mask: true });
      }, 300);
    }
  };

  /**
   * 关闭加载loading
   */
  closeIndicator = () => {
    this.requestCount -= 1;
    if (this.requestCount <= 0) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
      WXP.hideLoading();
    }
  };
  /**
   * 发起一个请求
   * @param {string} method OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   * @param {string} api api地址
   * @param {object|string|ArrayBuffer} data 数据
   * @param {object} params
   */
  request(method, api, data, params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const request = {
          url: `${this.baseUrl}/${api}`,
          data,
          method,
          dataType: params.dataType || 'json',
          header: {},
          __params: params,
          // responseType
        };
        if (typeof this._interceptors.onRequest === 'function') {
          Object.assign(request, await this._interceptors.onRequest(request));
        }
        this.openIndicator();
        let res = await WXP.request(request);
        this.closeIndicator();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (typeof this._interceptors.onResponse === 'function') {
            res = this._interceptors.onResponse(res);
          }
          return resolve(res);
        }
        if (typeof this._interceptors.onResponseError === 'function') {
          res = this._interceptors.onResponseError(res);
        }
        return reject(res);
      } catch (e) {
        this.closeIndicator();
        let res = e;
        if (typeof this._interceptors.onRequestError === 'function') {
          res = this._interceptors.onRequestError(res);
        }
        return reject(res);
      }
    });
  }

  /**
   * 发起一个get请求
   * @see request
   */
  get(...args) {
    return this.request('GET', ...args);
  }

  /**
   * 发起一个post请求
   * @see request
   */
  post(...args) {
    return this.request('POST', ...args);
  }

  /**
   * 发起一个put请求
   * @see request
   */
  put(...args) {
    return this.request('PUT', ...args);
  }

  /**
   * 发起一个delete请求
   * @see request
   */
  delete(...args) {
    return this.request('DELETE', ...args);
  }

  /**
   * 发起一个head请求
   * @see request
   */
  head(...args) {
    return this.request('HEAD', ...args);
  }

  /**
   * 发起一个options请求
   * @see request
   */
  options(...args) {
    return this.request('OPTIONS', ...args);
  }

  /**
   * @var {object} _interceptors 拦截器
   * onRequest, onRequestError
   * onResponse, onResponseError
   */
  _interceptors = {}

  /**
   * 设置拦截器
   */
  set interceptors(value) {
    this._interceptors = value;
  }
}

/**
 * @var {string} api基址
 */
export const BASE_URL = 'http://api.test.chaping.io/api';

/**
 * @var {object} interceptors
 */
const interceptors = {
  onRequest(req) {
    return new Promise(async (resolve, reject) => {
      let token = getAuthorization();
      if (req.__params.ignoreToken !== true) {
        if (!token) {
          await getUserInfo();
          token = getAuthorization();
        }
      }
      if (token) {
        req.header.Authorization = `Bearer ${token}`;
      }
      resolve(req);
    });
  },
  onRequestError(err) {
    WXP.showModal({
      title: '请求失败',
      content: '网络请求失败，请尝试重新打开小程序。',
      showCancel: false,
    });
    return err;
  },
  onResponse(res) {
    return res.data;
  },
  onResponseError(res) {
    if (typeof res.data === 'object' && res.data.errcode) {
      if (res.data.errcode === 401) {
        clearAuthorization();
        // 这里可能需要更好的方案
      } else if (res.data.errcode >= 500) {
        WXP.showModal({
          title: '服务器错误',
          content: '服务器出错啦，工程师正在加紧修复中。',
          showCancel: false,
        });
      } else {
        WXP.showModal({
          title: '操作失败 #404',
          content: res.data.errmsg,
          showCancel: false,
        });
      }
    } else {
      WXP.showModal({
        title: '请求失败',
        content: res.data,
        showCancel: false,
      });
    }
    return res;
  },
};

/**
 * @var {Http} 接口封装类
 */
export const http = new Http({ baseUrl: BASE_URL, interceptors });
