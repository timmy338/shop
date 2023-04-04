<template>
  <view class="my-search-container">
    <view class="my-search-box" :style="{'border-radius':radius+'px','height':vh+'px'}" @click="gotoSearch()">
      <uni-icons type="search" size="17"></uni-icons>
      <text>搜尋</text>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 18,
      },

    },
    created() {
      //navBarInfo胶囊位置
      const navBarInfo = uni.getMenuButtonBoundingClientRect()
      this.vh = navBarInfo.height
    },
    data() {
      return {
        vh: 0,
      };
    },
    methods: {
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>
<style lang="scss">
  .my-search-container {
    width: 500rpx;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    background-color: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    text {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
