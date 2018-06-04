/**
 * This file is part of the Muggle.
 * @copyright Copyright (c) 2018 Hangzhou Muggle Network Technology Co., Ltd.
 * @author William Chan <root@williamchan.me>
 */
import Vue from 'vue';
import MpvueRouterPatch from 'mpvue-router-patch';
import store from '@/store';
import App from '@/App';

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.use(MpvueRouterPatch);

const app = new Vue({
  ...App,
  store,
});
app.$mount();

Vue.prototype.$store = store;

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    // tabBar: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  },
};
