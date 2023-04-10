<template>

  <view class="my-upload-list">
    <view class="title">商品管理</view>
    <view class="upload-list" v-for="good in goodList">
      <upload-goods :goods="good"></upload-goods>
    </view>
  </view>


</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        goodList: []
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    },


    methods: {
      async getUploadEquip() {
        const {
          data: res
        } = await uni.$http.get('/getUploadEquip', {
          session: this.token
        })
        if (res.code !== 0) return uni.$showMsg()
        this.goodList = res.message
      }
    },
    onShow() {
      this.getUploadEquip()
    }
  }
</script>

<style lang="scss">
  .my-upload-list {
    padding: 10px;

    .title {
      margin-bottom: 10px;
      font-size: 25px;
      font-weight: bold;
    }

    .upload-list {
      border-radius: 1em;
      background-color: white;
    }
  }
</style>
