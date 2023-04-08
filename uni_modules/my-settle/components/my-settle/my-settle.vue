<template>
  <view class="my-settle">
    <label class="radio" @click="updateAllGoodsState(!isFullCheck)">
      <radio color="#ED5B6F" :checked="isFullCheck"><text>全選</text></radio>
    </label>
    <view class="amount-box">
      合計:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <view class="btn-settle" @click="settlement()">結算({{checkedCount}})</view>
  </view>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapState('m_user', ['token']),
      isFullCheck() {
        return this.total === this.checkedCount
      },
    },
    data() {
      return {
        secounds: 3,
        //定時器id
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('請先勾選商品!')
        if (!this.token) return uni.$showMsg('請先登錄!')
        if (!this.token) return this.delayNavigate()
        console.log('htelo')
        uni.navigateTo({
          url: '../../../../../subpkg/pay/pay'
        })


      },

      delayNavigate() {
        this.showTip(this.secounds)
        this.timer = setInterval(() => {
          this.secounds--
          if (this.secounds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my'
            })
            this.secounds = 3
            return
          }
          this.showTip(this.secounds)
        }, 1000)
      },
      showTip(n) {
        uni.showToast({
          icon: 'none',
          title: '請登入後再結算,' + n + '秒後自動跳轉',
          mask: true,
          duration: 1500
        })
      }
    }
  }
</script>
<style lang="scss">
  .my-settle {
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

    .radio {
      display: flex;
    }

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
</style>
