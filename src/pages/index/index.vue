<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userProfile.avatar" :src="userProfile.avatar" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userProfile.name"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/index" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import card from '@/components/card';

export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
    };
  },
  components: {
    card,
  },
  computed: {
    ...mapState(['userProfile']),
  },
  methods: {
    ...mapActions(['getUserProfile']),
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },

  mounted() {
    console.log('index');
    this.getUserProfile();
  },

};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 64rpx;
  height: 64rpx;
  margin: 10rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
  background: red;
  width: 320px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
