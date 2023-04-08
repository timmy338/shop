<template>
  <view class="upload">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
      <u-form-item labelWidth="75" label="商品名稱" prop="equipInfo.name" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.name" border="none"></u--input>
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

      <view class="type-picker" v-if="itemType.length!=0">
        <view class="type-picker-left">
          商品標簽
        </view>
        <view class="type-picker-right">
          <picker mode="multiSelector" @change="classifyChange" @columnchange="columnchange" :value="classifyIndex"
            :range="classifyArr" :range-key="'name'" :default-selector='selected'>
            <view class="uni-input">
              请选择分类
            </view>
          </picker>
          <view class="tag-list">
            <uni-tag @click="delTagList(i)" v-for="(item, i) in tagList" :key="i" :text="item.name"
              custom-style="background-color: #e5e5e6; border-color: #e5e5e6; color: #000000;border-radius:2em">
            </uni-tag>
          </view>


        </view>
      </view>

      <u-form-item labelWidth="75" label="服務器" prop="equipInfo.price" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.server" border="none"></u--input>
      </u-form-item>

      <u-form-item labelWidth="75" label="價格" prop="equipInfo.price" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.price" border="none"></u--input>
      </u-form-item>

      <u-form-item labelWidth="75" label="介紹" prop="equipInfo.intro" borderBottom ref="item1">
        <u--input v-model="form.equipInfo.intro" border="none"></u--input>
      </u-form-item>

      <view style="margin: 10px;">
        <view>图片上传</view>
        <view style="margin-top: 20rpx;">
          <view class="img" v-for="(item, i) in imgList" :key='i'>
            <image style="width: 100%;height: 100%;" :src="item" @click="ViewImage(item)"></image>
            <view @click="DelImg()" style="display: inline;">
              <uni-icons color="white" type="closeempty" class="close" size="20"></uni-icons>
            </view>
          </view>
          <view v-show="imgList.length==0">
            <view class="camera" @tap="ChooseImage">
              <uni-icons type="camera" size="40"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </u--form>
    <u-button @click="submit()">上架</u-button>
  </view>
</template>

<script>
  import {
    forEach
  } from 'lodash';
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        //表單對象用做規範格式
        form: {
          //上架商品的信息
          equipInfo: {
            name: '',
            game: '',
            itemTagsList: '',
            // 圖片上传列表
            imgPath: "",
            server: "",
            price: 0,
            intro: '',
            session: "",
          },
        },

        tagList: [],
        imgList: [],
        // 所屬遊戲picker
        gameType: [],
        gamePickerIndex: 0,

        //標簽picker

        itemType: [], // 選擇所屬遊戲後,可選標簽列表
        classifyArr: [
          [],
          []
        ], //兩列picker所需的存儲格式
        classifyIndex: [0, 0], // 兩列picker索引

        rules: {
          'equipInfo.name': {
            type: 'string',
            required: true,
            message: '请填写商品名稱',
            trigger: ['blur', 'change']
          },
          'equipInfo.price': {
            type: 'string',
            max: 1,
            required: true,
            message: '请填写商品價格',
            trigger: ['blur', 'change']
          },
          'equipInfo.intro': {
            type: 'string',
            max: 1,
            required: false,
          },
        },

      };
    },
    methods: {
      //圖片上傳方法
      //文件選擇
      ChooseImage() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            this.imgList = res.tempFilePaths
          }
        })
      },

      //預覽圖片
      ViewImage(item) {
        let imgurl = [item]
        console.log(item)
        uni.previewImage({
          current: 0,
          urls: imgurl
        });
      },
      //刪除上傳的圖片
      DelImg() {
        uni.showModal({
          title: '提示',
          content: '确定要删除照片吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.imgList = []
            }
          }
        })
      },
      clear(){
        this.form.equipInfo.game=''
        this.form.equipInfo.name=''
        this.form.equipInfo.itemTagsList=''
        this.form.equipInfo.imgPath=''
        this.form.equipInfo.server=''
        this.form.equipInfo.price=''
        this.form.equipInfo.intro=''
        this.tagList=[]
        this.imgList=[]
      },
      uploadImg() {
        uni.uploadFile({
          url: 'http://localhost:8080/upload', //post请求的地址
          filePath: this.imgList[0],
          name: 'files',
          success: (uploadFileRes) => {
            //uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
            var obj = JSON.parse(uploadFileRes.data)
            console.log(obj)
            this.form.equipInfo.imgPath = obj.path

            this.uploadEquip()
          }
        })
        
      },
      // 读取文件后
      submit() {
        this.uploadImg()
      },
      async uploadEquip() {
        if (this.tagList.length != 0) {
          this.tagList.forEach(x => this.form.equipInfo.itemTagsList += x.id + "|")
          this.form.equipInfo.itemTagsList = this.form.equipInfo.itemTagsList.slice(0, -1)
        }
        console.log(this.form.equipInfo)

        const {
          data: res
        } = await uni.$http.get('/uploadEquip',
          this.form.equipInfo
        )
        if (res.code !== 0) return uni.$showMsg()
        uni.$showMsg(res.message)
        this.clear()
      },
      // 确定遊戲picker选择结果
      gamePickerChange(e) {
        this.gamePickerIndex = e.detail.value
        console.log('picker发送选择改变，携带值为', this.gameType[e.detail.value])
        this.form.equipInfo.game = this.gameType[e.detail.value].name
        this.getGameItemType(this.gameType[e.detail.value].id)
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

      async getGameItemType(id) {
        const {
          data: res
        } = await uni.$http.get('/getGameItemType', {
          id
        })
        if (res.code !== 0) return uni.$showMsg()
        console.log(res)
        if (res.message.secoundType.length != 0) {
          this.itemType = res.message.secoundType
          this.getAllClassify()
        } else {
          this.itemType = []
        }
      },
      getAllClassify() {
        // 一级分类的数据源
        this.classifyArr[0] = this.itemType
        // 第一次打开时，默认给一级分类添加它的二级分类
        this.classifyArr[1] = this.itemType[0].secoundType
      },

      // 获取二级分类
      columnchange(e) {
        // 当滚动切换一级分类时，为当前的一级分类添加它的子类
        if (e.detail.column == 0) {
          // 在 H5 环境下 $set 会导致一级分类无法滚动， 小程序正常运行
          this.$set(this.classifyArr, 1, this.classifyArr[0][e.detail.value].secoundType)

        }
      },
      delTagList(i) {
        this.tagList.splice(i, 1)
      },
      // 选择商品分类
      classifyChange(e) {
        let value = e.target.value;
        this.classifyIndex = value;
        this.tagList.push(this.classifyArr[1][this.classifyIndex[1]])
      },

    },
    onShow() {
      this.getGameType()
      this.getGameItemType(5)
      this.form.equipInfo.session = this.token
    },
    computed: {
      ...mapState('m_user', ['token'])
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
    background-color: white;

    .img {
      position: relative;
      display: inline-block;
      width: 166rpx;
      height: 166rpx;
      vertical-align: top;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
    }

    .close {
      position: absolute;
      right: 0;
      background-color: rgba(0, 0, 0, .4);
      color: #fff;
    }

    .camera {
      display: inline-block;
      width: 166rpx;
      height: 166rpx;
      text-align: center;
      line-height: 166rpx;
      font-size: 46rpx;
      border: 1rpx dotted #8C9697;
      color: #8C9697;
      margin-bottom: 10rpx;
    }


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

    .u-checkbox-group {
      display: flex;
      flex-wrap: wrap;

      .u-checkbox {
        width: 100px;
      }
    }
  }
</style>
