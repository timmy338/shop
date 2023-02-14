<template>
  <view>
    <div class="box1">
      <div class="box"></div>
    </div>

    <!--轮播图-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 導航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i">
        <image class="nav-img" :src="item.image_src" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: []
      };
    },
    onLoad() {
      this.getSwiperList(),
        this.getNavList()
    },
    methods: {
      //輪播圖數據
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
        /* console.log(res) */
      },
      //导航數據
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        /* console.log(res) */
      }
    }
  }
</script>

<style lang="scss">
  .box1 .box {
    position: absolute;
    left: -30%;
    width: 150%;
    height: 150px;
    background-image: linear-gradient(0deg, #b1f0ec, #1D9BF0 50%);
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 100%;
  }

  swiper {
    height: 330rpx;
    margin: 0 20rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
</style>
