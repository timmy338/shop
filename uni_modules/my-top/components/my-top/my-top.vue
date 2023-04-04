<template>
  <view class="head-bar" :style="{'background': bgcolor}">
    <view class="status-bar" :style="{height:topBar.statusBarHeight+'px'}"></view>
    <view class="my-nav-bar" :style="{height:topBar.navBarHeight+'px'}">
      <slot></slot>
    </view>
  </view>
  </view>
</template>
<script>
  export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: 'linear-gradient(to right, #ED8778, #EA475D);'
      },
    },
    created() {
      //statusBarInfo最頂部
      const statusBarInfo = uni.getSystemInfoSync()
      this.topBar.statusBarHeight = statusBarInfo.statusBarHeight
      //navBarInfo胶囊位置
      const navBarInfo = uni.getMenuButtonBoundingClientRect()
      this.topBar.navBarHeight = navBarInfo.height + (navBarInfo.top - statusBarInfo.statusBarHeight) * 2
    },
    data() {
      return {
        topBar: {
          statusBarHeight: 0,
          navBarHeight: 0,
        }
      };
    },
  }
</script>
<style lang="scss">
  .head-bar {
    width: 100%;
    padding-bottom: 10px;

    .my-nav-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

  }
</style>
