<template>
  <view class="goods-detail-page" v-if="goods_info.equipname">
    <!-- 轮播图区域 -->
    <!--    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in [...goods_info.img] " :key="i">
        <image :src="item" @click="preview(i)"></image>
      </swiper-item>
    </swiper> -->
    <image :src="goods_info.img" @click="preview()"></image>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">
        ￥{{goods_info.price}}
      </view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <view class="goods-name">
          {{goods_info.equipname}}
        </view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="tagListView">
        <view v-for="(item,i) in goods_info.tagList" class="tag">
          {{item}}
        </view>
      </view>
      <view class="seller">
        <image :src="goods_info.user.img"></image>
        <view class="name">
          {{ goods_info.user.realName}}
        </view>
      </view>
      <view class="title">相似商品</view>
      <view class="content-rcmd">
        <view class="goods-box" v-for="item in goods_info.equipRcmdList">
          <my-goods :goods="item"></my-goods>
        </view>
      </view>
    </view>

    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(newVal) {
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }
    },
    data() {
      return {
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'star',
          text: '收藏'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: 'linear-gradient(to right,  #eeaea8,#EE7F75)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#EB5161',
            color: '#fff'
          }
        ]
      };
    },

    onLoad(options) {
      const id = options.id
      this.getGoodsDetail(id)
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      // 获取商品数据的方法
      async getGoodsDetail(id) {
        const {
          data: res
        } = await uni.$http.get('/getDetail', {
          id
        })
        if (res.code !== 0) return uni.$showMsg()
        console.log(res.message)
        // 为数据赋值
        this.goods_info = res.message
      },
      // 实现轮播图的预览效果
      preview() {
        let imgsArray = [this.goods_info.img];
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: 0,
          // 所有图片 url 地址的数组
          urls: imgsArray
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          // 切换到购物车页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goods_info.id,
            goods_name: this.goods_info.equipname,
            goods_price: this.goods_info.price,
            goods_count: 1,
            goods_small_logo: this.goods_info.img,
            goods_state: true,
            goods_game:this.goods_info.gamename,
            goods_seller_img:this.goods_info.user.img,
            goods_seller_name:this.goods_info.user.realName,
            goods_seller_id:this.goods_info.user.id,
          }
          this.addToCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail-page {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
    // swiper {
    //   height: 750rpx;

    //   image {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }

    .goods-info-box {
      padding: 10px;
      background-color: #FFFFFF;

      .price {
        margin: 10px 0;
        font-size: 18px;
        font-weight: bold;
        color: #EB554E;
      }

      .goods-info-body {
        display: flex;
        justify-content: space-between;

        .goods-name {
          font-size: 18px;
          font-weight: bold;
          padding-right: 10px;
        }

        .favi {
          width: 120px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-left: 1px solid #efefef;
          color: gray;
        }
      }
    }

    .goods_nav {
      // 为商品导航组件添加固定定位
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .tagListView {
      margin-top: 20rpx;
      display: flex;
      color: #61666D;
      font-size: 12px;

      .tag {
        margin-right: 10rpx;
        padding: 10rpx 20rpx;
        border-radius: 1em;
        background-color: #e4e4e5;
      }
    }

    .seller {
      margin-top: 10px;
      display: flex;
      align-items: center;

      image {
        width: 40px;
        height: 40px;
        border-radius: 3em;
      }

      .name {
        margin-left: 10px;
      }
    }
    .title{
        margin-top: 30rpx;
        font-size: 20px;
        font-weight: bold;
      }
    .content-rcmd {
      padding: 5rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
  
      .goods-box {
        width: 48%;
      }
    }
  }
</style>
