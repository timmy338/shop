<template>
  <view class="order-goods">
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <image :src="goods.img " class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.equipname}}</view>

        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.price}}</view>
        </view>
      </view>
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
        default: {},
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false,
      },

    },

    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
<style lang="scss">
  .order-goods {

    .goods-item {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #f0f0f0;

      .goods-item-left {
        margin-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-pic {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;

        .goods-name {
          font-size: 15px;
        }

        .goods-info-box {
          display: flex;
          justify-content: space-between;

          .seller {
            display: flex;
            align-items: center;

            image {
              width: 30px;
              height: 30px;
              border-radius: 3em;
            }

            .name {
              margin-left: 5px;
            }
          }

          .goods-price {
            font-size: 20px;
            font-weight: 800;
            color: #EB554E;
          }
        }

      }
    }
  }
</style>
