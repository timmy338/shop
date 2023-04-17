<template>
  <view class="user-recs-page">
    <text class="title">個性化推薦商品</text>
    <!-- 推薦商品 -->
    <view class="rcmd-list">
      <view class="rcmd-item" v-for="(item,i) in rcmdList">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    computed: {
      ...mapState('m_user', ['token'])
    },
    data() {
      return {
        rcmdList: [],
        rcmdListTotalPage: 0,
        queryObj: {
          current: 1,
          pageSize: 10,
          session: ""
        },
        isloading: false,

      };
    },
    methods: {
      onReachBottom() {
        //判斷是否還有下一頁數據
        if (this.queryObj.current == this.rcmdListTotalPage) {
          return uni.$showMsg('數據加載完畢')
        }
        if (this.isloading) return
        //頁碼++
        this.queryObj.current++
        this.getUserRcmdList()
      },
      //推薦欄數據
      async getUserRcmdList() {
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/main/tag_recs', this.queryObj)
        this.isloading = false
        if (res.code !== 0) return uni.$showMsg()
        console.log(res)
        // 为数据赋值
        this.rcmdList = [...this.rcmdList, ...res.message]
        this.rcmdListTotalPage = res.totalPage
      },
    },
    onShow() {
      this.queryObj.session = this.token
      this.getUserRcmdList()
    }
  }
</script>

<style lang="scss">
  .user-recs-page {

    padding: 20rpx;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #EA475D;
    }
    .rcmd-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .rcmd-item {
        width: 48%;
      }
    }

  }
</style>
