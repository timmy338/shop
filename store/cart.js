export default {
  //state类似于data，mutations类似methods，getters类似computed
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
     /* console.log(findResult, state.cart) */
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(x => c += x.goods_count)
      return c
    }
  }
}
