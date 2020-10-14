Component({
  properties: {
    isBack: {
      type: Boolean
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
        }).then(() => {
          console.log(this.data.customBar, this.data.statusBar, this.data.custom, 'wrapper',   this.data.custom.bottom + this.data.custom.top - this.data.statusBar)
        })
    },
  }
})