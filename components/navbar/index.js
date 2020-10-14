Component({
  properties: {

    statusBar: {
      type: Number,
    },
    custom: {
      type: Object,
    },
    customBar: {
      type: Number
    },
    isBack: {
      type: Boolean
    }

  },

  data: {

  },

  methods: {

  },

  lifetimes: {
    attached() {
      console.log(this.data.statusBar, this.data.custom, this.data.customBar, 'nav')
    }
  }
})