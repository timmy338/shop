<template>
  <view class="my-container">
    <my-top></my-top>
    <!--    <my-background-gradient :height="200" :gradientColor="'linear-gradient(to top, rgba(245, 245, 245, 0.5), rgba(255, 255, 255, 0))'"></my-background-gradient> -->
    <my-background-gradient :height="200"></my-background-gradient>
    <my-login v-if='!token'></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>

</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {

      }
    },

    methods: {

    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style>
  page,
  .my-container {
    background-color: white;
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;
  }
</style>
