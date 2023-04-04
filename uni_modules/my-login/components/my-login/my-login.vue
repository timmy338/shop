<template>
  <view class="login">
    <uni-icons type="contact-filled" size="140" color="#EC676B"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一鍵登錄</button>
    <text class="tips-text">登錄後才能購買喲~</text>
  </view>
</template>
<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        userInfo: {
          code: "",
          img: "",
          name: ""
        }
      }
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),

      getUserProfile() {
        uni.getUserProfile({
          desc: '请求授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.updateUserInfo(res.userInfo)

            uni.login({
              provider: 'weixin', //使用微信登录
              success: (loginRes) => {
                console.log(loginRes.code)
                this.userInfo.name = res.userInfo.nickName
                this.userInfo.img = res.userInfo.avatarUrl
                this.userInfo.code = loginRes.code
                this.getLoginInfo()
              }
            })
          },
          fail: (res) => {
            return uni.$showMsg("已取消登录授权")
          }
        })
      },

      async getLoginInfo() {
        const {
          data: res
        } = await uni.$http.post('/login',this.userInfo)
        console.log(res)
        if (res.code !== 0) return uni.$showMsg()
        this.updateToken(res.message.session_key)
      },

    },
    computed: {

    }
  }
</script>
<style lang="scss">
  .login {
    position: relative;
    height: 900rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99;

    .btn-login {
      width: 80%;
      background: linear-gradient(to right, #ED8778, #EA475D);
      margin: 15px 0;
      border-radius: 1em
    }

    .tips-text {
      font-size: 14px;
      color: gray;
    }
  }
</style>
