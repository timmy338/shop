<template>
  <view class="cart-goods">
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#ED5B6F" v-if="showRadio" @click="radioClickHandler()"></radio>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>

        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price}}</view>
          <view class="seller">
            <image :src="goods.goods_seller_img"></image>
            <view class="name">
              {{ goods.goods_seller_name}}
            </view>
          </view>
          <!--          <uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler">
          </uni-number-box> -->
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
        defaul: {},
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false,
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state,
          goods_game:this.goods.goods_game
        })
      },
      /*      // NumberBox 组件的 change 事件处理函数
            numChangeHandler(val) {
              // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
              this.$emit('num-change', {
                // 商品的 Id
                goods_id: this.goods.goods_id,
                // 商品的最新数量
                goods_count: +val
              })
            } */
    }
  }
</script>
<style lang="scss">
  .cart-goods {

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
