/**
 * This file is part of the Muggle.
 * @copyright Copyright (c) 2018 Hangzhou Muggle Network Technology Co., Ltd.
 * @author William Chan <root@williamchan.me>
 */
// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    userProfile: {},
    access: {
      resolve: null,
      reject: null,
    },
  },
  actions: {
    getUserProfile: ({ commit }) => {
      return new Promise((resolve, reject) => {
        api.getUserProfile().then((res) => {
          commit('userProfile', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  mutations: {
    userProfile: (state, data) => {
      state.userProfile = data;
    },
    increment: (state) => {
      const obj = state;
      obj.count += 1;
    },
    decrement: (state) => {
      const obj = state;
      obj.count -= 1;
    },
    SET_ACCESS(state, { reject, resolve }) {
      state.access.reject = reject;
      state.access.resolve = resolve;
    },
  },
});

export default store;
