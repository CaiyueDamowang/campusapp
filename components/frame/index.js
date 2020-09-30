// components/frame/index.js
Component({
  properties: {
  },

  data: {
    statusBarHeight: 20,
    windowBarHeight: '100rpx'
  },

  methods: {
    getTabbarHeight() {
      const promisify = (api) => {
        return function (option) {
          return new Promise((resolve, reject) => {
            api({
              ...option,
              success: (result) => resolve(result),
              fail: (reason) => reject(reason),
            })
          })
        }
      }

      const getHeight = promisify(wx.getSystemInfo)
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