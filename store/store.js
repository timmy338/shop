import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
//将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_cart':moduleCart,
    'm_user':moduleUser,
  },
})

export default store
