<template>
  <view class="home-page" :style="{'padding-top': topBar+'px'}">
    <view class="top-bar">
      <my-top>
        <my-searchs></my-searchs>
      </my-top>
    </view>
    <my-background-gradient></my-background-gradient>

    <!--轮播图-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.goods_id">
          <image :src="'http://localhost:8080/image/swiper/'+item.img"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 導航 -->
    <view class="nav-list">
      <navigator class="nav-item" v-for="(item,i) in navList" :key="i" :url="'/subpkg/'+item.remark">
        <image class="nav-img" :src="'http://localhost:8080/image/home_type/'+item.image" />
        <text>{{item.name}}</text>
      </navigator>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <text class="title">遊戲分類</text>
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList.slice(0,1)" :key="i">
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image :src="item.product_list[0].image_src" mode="widthFix"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1,3)" :key="i2">
              <image :src="item2.image_src" mode="widthFix"></image>
            </view>
          </view>
        </view>
      </view>

    </view>
    <view class="rcmd-box">
      <text class="title">推薦商品</text>
      <!-- 推薦商品 -->
      <view class="rcmd-list">
        <view class="rcmd-item" v-for="(item,i) in rcmdList">
          <my-goods :goods="item"></my-goods>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        swiperList: [],
        navList: [],
        rcmdList: [],
        queryObj: {
          current: 1,
          pageSize: 10
        },
        rcmdListTotalPage: 0,
        isloading: false,
        topBar: 0,
        // 1. 楼层的数据列表
        floorList: [],
      }
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getRcmdList()
      //this.getFloorList()
      const navBarInfo = uni.getMenuButtonBoundingClientRect()
      const statusBarInfo = uni.getSystemInfoSync()
      //+10 防止topbar太貼下方的組件
      this.topBar = 10 + statusBarInfo.statusBarHeight + navBarInfo.height + (navBarInfo.top - statusBarInfo
        .statusBarHeight) * 2
    },
    methods: {
      //輪播圖數據
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/main/swiper')
        if (res.code !== 0) return uni.$showMsg()
        this.swiperList = res.message
      },
      //导航數據
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/main/home_type')
        if (res.code !== 0) return uni.$showMsg()
        this.navList = res.message
        // console.log(res)
      },
      // 3. 定义获取楼层列表数据的方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.floorList = res.message
      },
      //推薦欄數據
      async getRcmdList() {
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/main/home_hot', this.queryObj)
        this.isloading = false
        if (res.code !== 0) return uni.$showMsg()
        console.log(res)
        // 为数据赋值
        this.rcmdList = [...this.rcmdList, ...res.message]
        this.rcmdListTotalPage = res.totalPage
      },
      /* // 获取商品列表数据的方法
      async getGoodsList(cb) {
        this.isloading=true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading=false
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.rcmdListTotal = res.message.rcmdListTotal
      }, */

    },
    onReachBottom() {
      //判斷是否還有下一頁數據
      if (this.queryObj.current == this.rcmdListTotalPage) {
        return uni.$showMsg('數據加載完畢')
      }
      if (this.isloading) return
      //頁碼++
      this.queryObj.current++
      this.getRcmdList()
    },
  }
</script>

<style lang="scss">
  .home-page {
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #EA475D;
    }

    .top-bar {
      position: fixed;
      top: 0;
      z-index: 90;
      width: 100%;
    }



    swiper {
      height: 330rpx;
      margin: 0 20rpx;
      margin-top: 20rpx;
      border-radius: 0.5em;
      overflow: hidden;

      .swiper-item,
      image {
        width: 100%;
        height: 100%;
      }
    }

    .nav-list {
      display: flex;
      justify-content: space-around;
      margin: 15rpx;
      background-color: white;
      padding: 20rpx;
      border-radius: 0.5em;
      box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #938058;

        .nav-img {
          width: 80rpx;
          height: 80rpx;
        }

        text {
          font-size: 10px;
        }
      }


    }

    .floor-list {
      padding: 20rpx;

      .floor-img-box {
        margin-top: 10px;
        display: flex;

        .left-img-box {
          width: 50%;

          image {
            width: 100%;
          }
        }

        .right-img-box {
          width: 50%;
          display: flex;
          flex-direction: column;

          image {
            width: 100%;
          }
        }
      }
    }

    .rcmd-box {
      padding: 20rpx;

      .rcmd-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .rcmd-item {
          width: 48%;
        }
      }
    }
  }
</style>
