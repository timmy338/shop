<template>
  <view class="upload">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
      <u-form-item label="商品名稱" prop="equipInfo.name" borderBottom ref="item1">
        <u--input v-model="model1.equipInfo.name" border="none"></u--input>
    	 </u-form-item>
      <u-form-item label="商品種類" prop="equipInfo.type" borderBottom @click="showtype = true;" ref="item1">
        <u--input v-model="model1.equipInfo.type" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="所屬遊戲" prop="equipInfo.intro" borderBottom ref="item1">
        <u--input v-model="model1.equipInfo.intro" border="none"></u--input>
      </u-form-item>
      <u-form-item label="價格" prop="equipInfo.intro" borderBottom ref="item1">
        <u--input v-model="model1.equipInfo.intro" border="none"></u--input>
      </u-form-item>
      <u-form-item label="數量" prop="equipInfo.intro" borderBottom ref="item1">
        <u--input v-model="model1.equipInfo.intro" border="none"></u--input>
      </u-form-item>
      <u-form-item label="介紹" prop="equipInfo.intro" borderBottom ref="item1">
        <u--input v-model="model1.equipInfo.intro" border="none"></u--input>
      </u-form-item>

    </u--form>
    <u-action-sheet :show="showtype" :actions="actions" title="请选择性别" description="如果选择保密会报错" @close="showtype = false"
      @select="typeSelect">
    </u-action-sheet>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showtype: false,
        model1: {
          equipInfo: {
            name: '',
            type: '',
            intro: '',
          },
        },
        actions: [{
            name: '男',
          },
          {
            name: '女',
          },
          {
            name: '保密',
          },
        ],
        rules: {
          'equipInfo.name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
          },
          'equipInfo.type': {
            type: 'string',
            max: 1,
            required: true,
            message: '请选择男或女',
            trigger: ['blur', 'change']
          },
        },
        radio: '',
        switchVal: false
      };
    },
    methods: {
      typeSelect(e) {
        this.model1.equipInfo.type = e.name
        this.$refs.uForm.validateField('equipInfo.type')
      },
    },
    onReady() {
      //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
      this.$refs.uForm.setRules(this.rules)
    },
  };
</script>

<style lang="scss">
  .upload {
    padding: 10px 15px;
  }
</style>
