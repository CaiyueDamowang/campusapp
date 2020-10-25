// components/toolbar/index.js
Component({
  properties: {
    windowBarHeight: String
  },

  data: {

  },

  lifetimes: {
    
  },

  methods: {
    redirectRouter(e) {
      this.store.setData({
        router: e.target.dataset.route
      })
    }
  }
})
