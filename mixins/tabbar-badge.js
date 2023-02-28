import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    total: {
      handler(val) {
        if (val != 0) {
          this.setBadge()
        } else {
          uni.removeTabBarBadge({
            index: 2
          })
        }
      },
    }
  },
  onShow() {
    if (this.total != 0) {
      this.setBadge()
    }
  },
  methods: {
    //計算商品的總個數
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}
