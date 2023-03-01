<template>
  <view>
    <my-top></my-top>
    <my-background-gradient :height="300"></my-background-gradient>
    <my-login v-if="!token"></my-login>
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
    computed:{
      ...mapState('m_user',['token'])
    }
  }
</script>

<style>

</style>
