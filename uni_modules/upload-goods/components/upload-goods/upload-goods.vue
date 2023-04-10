<template>
  <view class="upload-goods">
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <image :src="imgShow" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <view class="goods-info-box">
          <!-- 商品标题 -->
          <view class="goods-name">{{goods.equipname}}</view>
          <view class="goods-status">{{goodStatus}}</view>
        </view>
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.price}}</view>
          <view class="btn" v-if="goods.status==1">
            <u-button @click="sellerConfirm(goods.id)">確認發貨</u-button>
          </view>
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
    },

    data() {
      return {

      }
    },
    methods: {
      async sellerConfirm(id) {
        const {
          data: res
        } = await uni.$http.get('/sellerConfirm', {
          id
        })
        if (res.code !== 0) return uni.$showMsg()
        this.$parent.getUploadEquip();
        console.log(res.message)
      }
    },
    computed: {
      goodStatus() {
        switch (this.goods.status) {
          case 0:
            return "出售中";
          case 1:
            return "待發貸";
          case 2:
            return "待買家收貨";
          case 3:
            return "已完成";
        }
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
  .upload-goods {

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

        .goods-status {
          margin-right: 5px;
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
