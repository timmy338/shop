<template>
  <view class="cart-page">
    <my-top></my-top>
    <view class="cart-container" v-if="cart.length!==0">

      <!-- 购物车商品列表的标题区域 -->
      <view class="cart-title">
        <!-- 左侧的图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 描述文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
      <!-- 商品列表区域 -->
      <uni-swipe-action>
        <block v-for="(cartItem, i) in cart" :key="i">
          <view>{{cartItem.game}}</view>
          <!--  @click="swipeActionClickHandler(goods)"
          @num-change="numberChangeHandler"
          @radio-change="radioChangeHandler"
          -->
          <uni-swipe-action-item v-for="(goods, j) in cartItem.goodList"  :key="j" :right-options="options" 
          @click="removeGoodsById(goods)"  >
            <cart-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler"></cart-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <my-settle></my-settle>
    </view>
    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="/static//Empty state_money.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>

  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '刪除',
          style: {
            backgroundColor: '#ED5B6F'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'removeGoodsById']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },

    },
    onShow() {

    }
  }
</script>

<style lang="scss">
  .cart-page {
    padding-bottom: 70px;

    .cart-title {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding-left: 5px;
      border-bottom: 1px solid #efefef;

      .cart-title-text {
        margin-left: 10px;
      }
    }

    .empty-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 80px;

      .empty-img {
        width: 300px;
        height: 300px;
      }

      .tip-text {
        font-size: 12px;
        color: gray;
        margin-top: 15px;
      }
    }
  }
</style>
