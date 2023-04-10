<template>
  <view class="">
    <view class="add-btn" @click="gotoInitReceipt">
      添加收貨信息
      <uni-icons type="plus" size="20"></uni-icons>
    </view>
    <uni-swipe-action>
      <uni-swipe-action-item v-for="receipt in receiptList" :right-options="options" 
          @click="remove()">
        <my-receipt-info :receipt="receipt"></my-receipt-info>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        receiptList: [],
        options: [{
          text: '刪除',
          style: {
            backgroundColor: '#ED5B6F'
          }
        }],
        
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    },
    onShow() {
      this.getReceipt()
    },
    methods: {
      async getReceipt() {
        const {
          data: res
        } = await uni.$http.get('/getReceiptBySession', {
          session: this.token
        })
        if (res.code !== 0) return uni.$showMsg()
        console.log(res.message)
        this.receiptList = res.message
      },
      gotoInitReceipt() {
        uni.navigateTo({
          url: '/subpkg/init_receipt/init_receipt'
        })
      },
      remove(){
        console.log('del')
      }
    }
  }
</script>

<style lang="scss">
  .add-btn {
    height: 80px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    border-bottom: 1px solid #cbcbcb;
  }
</style>
