Component({
  properties: { // 接受父组件的传值
    isBack: {
      type: Boolean
    },
    title: {
      type: String
    }
  },

  data: {
    statusBar: 20,
    custom: 0,
    customBar: 0,
    windowBar: '100',
  },

  methods: {
    getSystemInfo() {
      const getSystemInfo = this.promisify(wx.getSystemInfo)
      return getSystemInfo()
    }
  },

  lifetimes: {
    attached() {
      this.getSystemInfo()
      .then((e) => {
          const custom = wx.getMenuButtonBoundingClientRect()
          this.setData({
            statusBar: e.statusBarHeight,
            custom: custom,
            customBar: custom.bottom + custom.top - e.statusBarHeight
          })
        })
    },
  }
})