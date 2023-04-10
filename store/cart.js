export default {
  //state类似于data，mutations类似methods，getters类似computed
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods) {
      const findGame = state.cart.find(x => x.game === goods.goods_game)
      if (!findGame) {
        state.cart.push({
          game: goods.goods_game,
          goodList: [goods]
        })
        this.commit('m_cart/saveToStorage')
      } else {
        const findResult = findGame.goodList.find(x => x.goods_id === goods.goods_id)
        if (!findResult) {
          findGame.goodList.push(goods)
          this.commit('m_cart/saveToStorage')
        } else {
          uni.$showMsg("商品已存在")
        }

      }
      /*      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
            if (!findResult) {
              state.cart.push(goods)
              this.commit('m_cart/saveToStorage')
            } else {
              uni.$showMsg("商品已存在")
            } */
      /* console.log(findResult, state.cart) */
    },

    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const findGame = state.cart.find(x => x.game === goods.goods_game)
      const findResult = findGame.goodList.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    /*    updateGoodsCount(state, goods) {
          const findResult = state.cart.find(x => x.goods_id === goods.id)
          if (findResult) {
            findResult.goods_count = goods.goods_count
            this.commit('m_cart/saveToStorage')
      
   }
        }, */
    removeGoodsById(state, goods) {
      const findGame = state.cart.find(x => x.game === goods.goods_game)
      findGame.goodList = findGame.goodList.filter(x => x.goods_id !== goods.goods_id)
      this.commit('m_cart/saveToStorage')
    },
/*    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    } */
  },
  getters: {
    //計算商品的總個數
    total(state) {
      let c = 0
      state.cart.forEach(x => c += x.goodList.length)
      return c
    },
    //計算勾選商品的數目
    checkedCount(state) {
      let c = 0
      state.cart.forEach(
        x => c += x.goodList.filter(y => y.goods_state).length
      )
      return c
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      let goodsTotal = 0
      state.cart.forEach(
        x => goodsTotal += 
        x.goodList.filter(y => y.goods_state).reduce((total, item) => total += item.goods_price, 0)
      )
      return goodsTotal.toFixed(2)
    },
    payList(state){
      let goodList=[]
      state.cart.forEach(
        x => x.goodList.filter(y => y.goods_state)
        .forEach(x=>goodList.push(x))
        )
      
      return goodList;
    }
  }
}
