
Page({
  data: {
    router: 'mine',
    isBack: true,
    title: '传值'
  },
  
  onLoad() {
    console.log(this.setData)
  },

  changeRouter(e) {
    const router = e.detail.router
    this.setData({
      router
    })

  }
})
