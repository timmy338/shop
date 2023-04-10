<template>
  <view class="order-list-page">
    <view class="title">訂單管理</view>
    <view v-for="item in orderList">
      <my-order :orderInfo="item"></my-order>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        orderList: []
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    },

  
    methods: {
      async getOrderBySession() {
        const {
          data: res
        } = await uni.$http.get('/getOrderBySession', {
          session: this.token
        })
        if (res.code !== 0) return uni.$showMsg()
        this.orderList = res.message
        console.log(res.message)
      }
    },
    onShow() {
      this.getOrderBySession()
    }
  }
</script>

<style lang="scss">
  .order-list-page {
    padding: 10px;

    .title {
      margin-bottom: 10px;
      font-size: 25px;
      font-weight: bold;
    }
  }
</style>
