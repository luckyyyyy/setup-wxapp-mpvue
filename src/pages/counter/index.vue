<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <p @click="to">123</p>
    <a href="/pages/index/index" class="home">去往首页</a>
  </div>
</template>

<script>


export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    to() {
      this.$router.push({ path: '/pages/index/index' });
      console.log(555);
    },
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
  },
  mounted() {
    console.log(2);
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
