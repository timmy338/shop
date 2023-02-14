<template>
  <view>
    Home
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
      };
    },
    onLoad(){
      this.getSwiperList()
    },
    methods:{
      async getSwiperList(){
        const res=uni.$http.get('/api/public/v1/home/swiperdata')
        console.log(res)
      }
    }
  }
</script>

<style lang="scss">

</style>
