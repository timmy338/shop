<template>
  <view class="receipt-box" @click="select">
    <view class="game-info">
      <view>遊戲名:{{receipt.game}}</view>
      <view>伺服器:{{receipt.server==""?"空":receipt.server}}</view>
    </view>
    <view class="account-info">
      <view>帳戶:{{receipt.account}}</view>
      <view>昵称:{{receipt.name}}</view>
    </view>
    <view>手機號:{{receipt.phone}}</view>
  </view>
</template>
<script>
  export default {
    props: {
      // 商品的信息对象
      receipt: {
        type: Object,
        default: {},
      },
    },
    methods: {
      select() {


        // --------主要是以下代码---------
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.$vm.receiptInfo = this.receipt;
        uni.navigateBack({
          delta: 1
        })

      }
    }
  }
</script>
<style lang="scss">
  .receipt-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    height: 100px;
    background-color: white;
    border-bottom: 1px solid #dcdcdc;
    .game-info {
      display: flex;
      justify-content: space-between;
    }

    .account-info {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
