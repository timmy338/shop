<template>
  <!-- 商品列表頁 -->
  <view class="goods-list-page">
    <!-- 商品列表 -->
    <view class="goods-list">
      <view class="goods-box" v-for="(item, i) in goodsList" @click="gotoDetail(item)">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="item"></my-goods>
      </view>
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
          searchKW: '',
          // 商品分类Id
          cid: '',
          current: 1,
          pageSize: 10
        },
        goodsList: [],
        total: 0,
        isloading: false
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.searchKW = options.searchKW || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        this.isloading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/search', this.queryObj)
        this.isloading = false
        cb && cb()
        if (res.code !== 0) return uni.$showMsg()
        // 为数据赋值
        this.goodsList = [...this.goodsList, ...res.message]
        this.total = res.totalPage
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + goods.id
        })
      },
    },
    onReachBottom() {
      //判斷是否還有下一頁數據
      if (this.queryObj.current== this.total) {
        return uni.$showMsg('數據加載完畢')
      }
      if (this.isloading) return
      //頁碼++
      this.queryObj.current++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },

  }
</script>

<style lang="scss">
  .goods-list-page {
    background-color: #F4F4F4;

    .goods-list {
      padding: 10rpx 10rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .goods-box {
        width: 48%;
      }
    }
  }
</style>
