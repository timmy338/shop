<template>  
  <!-- 商品列表頁 -->
  <view style="background-color: #F4F4F4;">
    <!-- 商品列表 -->
    <view class="goods-list">
          <template v-for="(item, i) in goodsList">
            <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
            <my-goods :goods="item"></my-goods>
          </template>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList() {
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值
        this.goodsList = res.message.goods
        this.total = res.message.total
      }
    }
  }
</script>

<style lang="scss">
  .goods-list {
    padding: 10rpx 10rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
