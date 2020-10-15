
Page({
  data: {
    router: 'mine',
    isBack: true,
    title: '传值'
  },
  
  onLoad() {

  },

  changeRouter(e) {
    console.log(e.detail)
  }
})
