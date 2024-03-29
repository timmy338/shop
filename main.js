// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'



//導入網絡請求的包,掛載到Uniapp
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
/* $http.baseUrl = 'https://www.uinav.com/' */
$http.baseUrl = 'http://localhost:8080/'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
uni.$showMsg=function(title='數據請求失敗!',duration=1500){
  uni.showToast({
    title,
    duration
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

// main.js，注意要在use方法之后执行
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

const app = new Vue({
  ...App,store
})

app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
