<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <p @click="to">123</p>
    <a href="/pages/index/index" class="home">去往首页</a>
    <button @getuserinfo="hello" open-type="getUserInfo">点击登陆</button>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    ...mapState(['auth']),
  },
  onUnload() {
    this.auth.reject();
    console.log('onUnload');
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {
    to() {
      this.$router.push({ path: '/pages/index/index' });
    },
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
    hello(cb) {
      this.auth.resolve(cb);
      this.$router.back();
    },
  },
};

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
