Component({
  properties: {
    // 组件的属性列表
  },

  // 组件的初始数据
  data: {
    statusBarHeight: 20,
  },

  // 组件的方法列表
  methods: {
    getTabbarHeight() {
      const promisify = (api) => {
        return function (option) {
          return new Promise((resolve, reject) => {
            api({
              ...option,
              success: (result) => resolve(result),
              fail: (reason) => reject(reason)
            })
          })
        }
      }

      const getHeight = promisify(wx.getSystemInfo)
      return getHeight().then(res => res.statusBarHeight)
    }
  },

  // 组件的生命周期
  lifetimes: {
    attached() {
      this.getTabbarHeight()
        .then(statusBarHeight => {
          statusBarHeight != this.data.statusBarHeight &&
          this.setData({ statusHeight })
        })
    },
  }
})