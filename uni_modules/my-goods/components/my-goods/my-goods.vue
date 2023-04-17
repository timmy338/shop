<template>
  <view class="goods-item" @click="gotoDetail(goods.id)">
    <!-- 商品照片 -->
    <image class="goods-item-image" :src="imgShow || defaultPic"></image>
    <!-- 商品名稱 -->
    <view class="goods-item-name">{{goods.equipname}}</view>
    <!-- 商品信息(價格,數量) -->
    <view class="goods-item-info">¥<text class="price">{{fix}}</text><text class="count">
        共{{goods.count}}件</text></view>
    <!-- 商品賣家 -->
    <view class="goods-item-seller">
      <image :src="goods.user.img"></image><text>{{goods.user.realName}}</text>
    </view>
  </view>
</template>
<script>
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      },
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      gotoDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + id
        })
      },
    },
    options: {
      virtualHost: true
    },
    computed: {
      fix() {
        return Number(this.goods.price).toFixed(2)
      },
      imgShow() {
        if (this.goods.img.includes("https")) {
          return this.goods.img
        } else {
          return 'http://localhost:8080/image/equipUpload/' + this.goods.img
        }
      }
    }

  }
</script>
<style lang="scss">
  .goods-item {
    margin: 10rpx 0;
    background-color: white;
    border-radius: 13rpx;
    box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);

    .goods-item-image {
      width: 100%;
      height:350rpx;
      object-fit: contain;
      border-radius: 10rpx;
      
    }

    .goods-item-name {
      padding: 0 10px;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 1px;
      word-break: break-all;
      /* 超过了就隐藏 */
      overflow: hidden;
      /* 超过了就显示省略号 */
      text-overflow: ellipsis;
      /* webkit内核的浏览器 */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods-item-info {
      padding: 5px 10px;
      font-size: 10px;
      font-weight: bold;
      color: #EB554E;

      .price {
        font-size: 16px;
      }

      .count {
        color: #999999;
        font-weight: 100;
        margin-left: 5px;
      }
    }

    .goods-item-seller {
      display: flex;
      align-items: center;
      padding: 10px;

      image {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50px;
      }

      text {
        color: #999999;
        margin-left: 5px;
        font-size: 12px;
      }
    }

  }
</style>
