<template>
  <view class="pay-page">
    <view class="top">
      等待付款...
    </view>
    <view class="detail">
      <view v-if="!receiptInfo.name">
        <view class="address-choose-box">
          <view class="address-btn" @click="gotoReceipt">
            請選擇交易帳戶+
          </view>
        </view>
      </view>
      <view v-else>
        <view class="address-title">交易帳戶信息</view>
        <view class="address-show" @click="gotoReceipt">
          <view class="game-info">
            <view>遊戲名:{{receiptInfo.game}}</view>
            <view>伺服器:{{receiptInfo.server==""?"空":receiptInfo.server}}</view>
          </view>
          <view>帳戶:{{receiptInfo.account}}</view>

        </view>
      </view>

      <view class="goods-list">
        <view class="id">商品信息:</view>
        <view v-for="item in payList">
          <cart-goods :goods="item" :showRadio="false" :showNum="true"></cart-goods>
        </view>
      </view>

      <view class="goods-list-info">
        <text>共{{checkedCount}}件商品</text>
      </view>
    </view>

    <view class="confirm">
      <view class="amount-box">
        合計:<text class="amount">￥{{checkedGoodsAmount}}</text>
      </view>

      <view class="btn-settle" @click="settlement()">支付</view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        receiptInfo: {},
        orders: {
          session: "",
          receiptId: 0,
          goodList: "",
          price:0,
        }
      };
    },
    computed: {
      ...mapGetters('m_cart', ['payList', 'checkedCount', 'checkedGoodsAmount']),
      ...mapState('m_cart', ['cart']),
      ...mapState('m_user', ['token']),
    },
    methods: {
       ...mapMutations('m_cart', ['removeGoodsById']),
      async insertOrder() {
        const {
          data: res
        } = await uni.$http.get('/insertOrder',this.orders)
        if (res.code !== 0) return uni.$showMsg()
        console.log(res.message)
        /* console.log(this.gameType) */
      },
      gotoReceipt() {
        uni.navigateTo({
          url: '/subpkg/receipt/receipt'
        })
      },
      
      gotoOrderList() {
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      settlement() {
        if (!this.receiptInfo.name) return uni.$showMsg('請選擇交易帳戶!')
        this.orders.session = this.token
        this.orders.receiptId = this.receiptInfo.id
        this.orders.price=this.checkedGoodsAmount
        this.payList.forEach(x => this.orders.goodList += x.goods_id + "|")
        this.orders.goodList = this.orders.goodList.substring(0, this.orders.goodList.length - 1);
        this.insertOrder();
        this.payList.forEach(x=>this.removeGoodsById(x))
        console
        this.gotoOrderList()
      }
    },
    onShow() {
      let pages = getCurrentPages();
      if (pages[pages.length - 1].$vm.receiptInfo) {
        this.receiptInfo = pages[pages.length - 1].$vm.receiptInfo
      }
    },

  }
</script>

<style lang="scss">
  .pay-page {
    .top {
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      background-color: #ED5B6F;
      color: white;
    }

    .detail {
      background-color: white;
      border-radius: 1em;

      .address-choose-box {
        display: flex;
        height: 80px;
        justify-content: center;
        align-items: center;
        border-bottom: 1rpx solid #ededed;

        .address-btn {
          width: 100px;
          background: linear-gradient(to right, #ED8778, #EA475D);
          font-size: 12px;
          color: white;
          padding: 8px 14px;
          border-radius: 0.5em;
        }
      }

      .address-title {
        padding-left: 10px;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
        color: black;
      }

      .address-show {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 60px;
        padding: 10px;
        border-bottom: 1px solid #dcdcdc;

        .game-info {
          display: flex;
          justify-content: space-between;
        }

      }

      .goods-list {
        padding: 10px;
      }

      .goods-list-info {
        padding: 10px;
        display: flex;
        justify-content: flex-end;
        line-height: 30px;
      }
    }

    .confirm {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: white;
      z-index: 90;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      padding-left: 5px;

      .amount-box {
        .amount {
          font-size: 14px;
          font-weight: bold;
          color: #EB554E;
        }
      }

      .btn-settle {
        background: linear-gradient(to right, #ED8778, #EA475D);
        height: 50px;
        color: white;
        line-height: 50px;
        padding: 0 10px;
        min-width: 100px;
        text-align: center;
      }
    }
  }
</style>
