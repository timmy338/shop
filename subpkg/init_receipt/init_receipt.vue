<template>
  <view class="init-receipt">

    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="form"  ref="uForm">
      <u-form-item labelWidth="75" label="用戶名" prop="equipInfo.name" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.name" border="none"></u--input>
      </u-form-item>
      <u-form-item labelWidth="75" label="用戶號" prop="equipInfo.account" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.account" border="none"></u--input>
      </u-form-item>

      <view class="type-picker">
        <view class="type-picker-left">
          所屬遊戲
        </view>
        <view class="type-picker-right">
          <picker @change="gamePickerChange($event)" :value="gamePickerIndex" :range="gameType" :range-key="'name'">
            <view class="uni-input">
              {{gameType[gamePickerIndex].name}}
            </view>
          </picker>
        </view>
      </view>



      <u-form-item labelWidth="75" label="服務器" prop="equipInfo.price" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.server" border="none"></u--input>
      </u-form-item>
      <u-form-item labelWidth="75" label="手機號" prop="equipInfo.phone" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.phone" border="none"></u--input>
      </u-form-item>

    </u--form>
    <u-button @click="uploadReceipt()">添加收貸信息</u-button>
  </view>

</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        form: {
          //上架商品的信息
          equipInfo: {
            name: '',
            game: '',
            account: '',
            server: "",
            phone: '',
            session: "",
          },
        },
        gamePickerIndex: 0,
        // 所屬遊戲picker
        gameType: [],
      }
    },
    computed: {
      ...mapState('m_user', ['token'])
    },
    onShow() {
      this.getGameType()
      this.form.equipInfo.session = this.token
    },
    methods: {
      // 确定遊戲picker选择结果
      gamePickerChange(e) {
        this.gamePickerIndex = e.detail.value
        this.form.equipInfo.game = this.gameType[e.detail.value].name
      },
      async getGameType() {
        const {
          data: res
        } = await uni.$http.get('/getGameType')
        if (res.code !== 0) return uni.$showMsg()
        this.gameType = res.message
        this.form.equipInfo.game = this.gameType[0].name
        /* console.log(this.gameType) */
      },
      async uploadReceipt() {
        console.log(this.form.equipInfo)
       const {
          data: res
        } = await uni.$http.get('/uploadReceipt',
          this.form.equipInfo
        )
        if (res.code !== 0) return uni.$showMsg()
        uni.$showMsg(res.message)
        uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
        		delta: 1
        	});
      },
    }
  }
</script>

<style lang="scss">
  .init-receipt {
    padding: 10px 15px;
    background-color: white;

    .type-picker {
      display: flex;
      padding: 10px 0;
      border-bottom: 2px solid #F8F8F9;

      .type-picker-right {
        margin-left: 10px;

        .tag-list {
          display: flex;
          flex-wrap: wrap;

          uni-tag {
            margin-top: 10px;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
