<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="請輸入搜尋內容" bgColor="#F1F3F4" 
        :focus="true"></uni-search-bar>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-if="searchKW.length===0">
      <!-- 标题区域 -->
      <view class="history-title">
        <text style="font-weight: bold;">搜索历史</text>
        <view class="history-trash" @click="cleanHistory">
          <uni-icons type="trash" size="17" color="#b4b4b5"></uni-icons>
          <text>刪除搜索历史</text>
        </view>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i"
          custom-style="background-color: #e5e5e6; border-color: #e5e5e6; color: #000000;" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-else>
      <view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="gotoGoodsDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <!--  <uni-icons type="arrowright" size="16"></uni-icons> -->
      </view>
    </view>
  </view>
</template>

<script>
  import {
    debounce
  } from 'lodash'
  export default {
    data() {
      return {
        searchKW: "",
        searchList: [],
        // 搜索关键词的历史记录
        historyList: []
      };
    },
    onLoad() {
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    methods: {
      onSearch: debounce(function() {
        // 请求接口
        /*        console.log(this.searchKW) */
        this.getSearchList()
      }, 1000),
      // 输入变化
      input(e) {
        this.searchKW = e
        // 调用防抖搜素函数
        this.onSearch()
      },
      //搜索數據
      async getSearchList() {
        // 判断关键词是否为空
        if (this.searchKW === '') {
          this.searchList = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.searchKW
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchList = res.message
        /* console.log(res) */
        this.saveSearchHistory()
      },
      gotoGoodsDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory(){
        const set=new Set(this.historyList)
        set.delete(this.searchKW)
        set.add(this.searchKW)
        this.historyList=[...set]
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
        
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    },
    computed:{
      histories(){
        return [...new Set(this.historyList)].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 30rpx 20rpx;
      border-bottom: 2px solid #efefef;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 15px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
    }

    .history-trash {
      height: 18px;
      line-height: 18px;
      display: flex;
      align-items: center;
      color: #b4b4b5;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
