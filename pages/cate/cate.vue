<template>
  <view class="cate-page">
    <!-- 使用自定义的搜索组件 -->
    <my-top>
      <my-searchs></my-searchs>
    </my-top>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">{{item.name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-sub" v-for="(item2,i2) in cateSubList">
          <view v-if="item2.secoundType.length!=0">
            <view class="cate-sub-title">/{{item2.name}}/</view>
            <!-- 动态渲染三级分类的列表数据 -->
            <view class="cate-third-list">
              <!-- 三级分类 Item 项 -->
              <view class="cate-third-item" v-for="(item3, i3) in item2.secoundType" :key="i3"
                @click="gotoGoodsList(item3)">
                <!-- 文本 -->
                <text>{{item3.name}}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateSubList: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const navBarInfo = uni.getMenuButtonBoundingClientRect()
      const statusBarInfo = uni.getSystemInfoSync()
      //+10 防止topbar太貼下方的組件
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = statusBarInfo.windowHeight - (10 + statusBarInfo.statusBarHeight + navBarInfo.height + (navBarInfo.top -
        statusBarInfo.statusBarHeight) * 2)
      //分類列表數據
      this.getCateList()
    },
    methods: {
      //獲取左側分類
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/category')
        if (res.code !== 0) return uni.$showMsg()
        //console.log(res.message)
        this.cateList = res.message
        this.cateSubList = res.message[0].secoundType
      },
      //點擊左側分類事件
      activeChange(index) {
        this.active = index;
        this.cateSubList = this.cateList[index].secoundType
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      // 点击三级分类项跳转到商品列表页面
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },

    }
  }
</script>

<style lang="scss">
  .cate-page {
    background-color: white;

    .scroll-view-container {
      display: flex;

      .left-scroll-view {
        width: 110px;
        background-color: #F7F7F7;

        .left-scroll-view-item {
          line-height: 60px;
          background-color: #f7f7f7;
          text-align: center;
          font-size: 12px;

          // 激活项的样式
          &.active {
            background-color: #ffffff;
            position: relative;

            // 渲染激活项左侧的红色指示边线
            &::before {
              content: ' ';
              display: block;
              width: 3px;
              height: 30px;
              background-color: #ED8778;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }

      .right-scroll-view {
        .cate-sub-title {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          padding: 15px 0;
        }

        .cate-third-list {
          display: flex;
          flex-wrap: wrap;

          .cate-third-item {
            width: 40%;
            padding: 10rpx 10rpx;
            margin-left: 20rpx;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px #9197A5 solid;
            border-radius: 0.5em;
            color: #9197A5;

            text {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
