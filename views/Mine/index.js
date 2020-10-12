Component({
  properties: {
    // 组件的属性列表
  },

  data: {

  },

  methods: {

  },
  lifetimes: {
    attached() {
      this.triggerEvent('changeRouter', { router: 'login' })
    }
  }
})
