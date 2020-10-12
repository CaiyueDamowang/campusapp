Component({
  properties: {
  },

  data: {
    statusBarHeight: 20,
    windowBarHeight: '100rpx'
  },

  methods: {
    getTabbarHeight() {
      const getHeight = this.promisify(wx.getSystemInfo)
      return getHeight().then(res => res.statusBarHeight)
    }
  },
  lifetimes: {
    attached() {
      this.getTabbarHeight()
        .then(statusBarHeight => {
          statusBarHeight != this.data.statusBarHeight &&
            this.setData({
              statusBarHeight
            })
        })
    },
  }
})