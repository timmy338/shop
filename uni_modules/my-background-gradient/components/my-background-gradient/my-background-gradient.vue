<template>
  <view class="box1" :style="{'height':height+'px'}">
    <view class="box" :style="{'background':gradientColor}"></view>
  </view>
</template>
<script>
  export default {
    props: {
      // 圆角尺寸
      height: {
        type: Number,
        // 单位是 px
        default: 150,
      },
      gradientColor: {
        type: String,
        default: 'linear-gradient(to top, rgba(245, 245, 245, 0.95), rgba(255, 255, 255, 0))',
      }
    },
  }
</script>
<style lang="scss">
  .box1 {
    position: absolute;
    width: 100%;
    background: linear-gradient(to right, #ED8778, #EA475D);
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    z-index: 0;

    .box {
      height: 100%;
      width: 100%;
    }
  }
</style>
