<template>
  <view class="my-order">
    <view class="top">
      <view>
        訂單編號:{{orderInfo.id}}
      </view>
      <view>
        {{orderStatus}}
      </view>
    </view>
    <view class="goods-list">
      <view class="id">商品信息:</view>
      <view v-for="good in orderInfo.equipInfoList">
        <order-goods :goods="good" :showRadio="false" :showNum="true"></order-goods>
      </view>
      <view class="goods-list-info">
        <text>共{{orderInfo.count}}件商品,合計{{orderInfo.totalPrice}}</text>
      </view>
      <view class="btn" v-if="orderInfo.status==1">
        <u-button @click="buyerConfirm(orderInfo.id)">確認收貨</u-button>
      </view>
    </view>

  </view>

</template>
<script>
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      orderInfo: {
        type: Object,
        defaul: {},
      },
    },
    data() {
      return {

      };
    },
    methods: {
      async buyerConfirm(id) {
        const {
          data: res
        } = await uni.$http.get('/buyerConfirm', {
          id
        })
        if (res.code !== 0) return uni.$showMsg()
        this.$parent.getOrderBySession();
      }
    },

    created() {
      console.log(this.orderInfo.equipInfoList)
    },
    computed: {
      orderStatus() {
        switch (this.orderInfo.status) {
          case 0:
            return "待發貨";
          case 1:
            return "待收貨";
          case 2:
            return "已完成";
        }
      }
    }
  }
</script>
<style lang="scss">
  .my-order {
    margin-bottom: 20px;
    padding: 15px;
    padding-bottom: 0;
    border-radius: 1em;
    background-color: white;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      border-bottom: 2px solid #dedede;
    }

    .goods-list {
      margin-top: 10px;
    }

    .goods-list-info {
      padding: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
