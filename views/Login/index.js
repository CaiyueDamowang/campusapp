const app = getApp()

Component({
  properties: {

  },

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username: '',
    password: ''
  },

  lifetimes: {
    attached() {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    }
  },

  methods: {
    getUserInfo(e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    login: function() {
      // wx.showLoading({ title: '登陆中' })
      let userData = JSON.stringify({
        username: this.data.username,
        password: this.data.password
      }); 
      console.log(userData);
      // loginCUMT(encrypt(userData))   // 登陆密文
      //   .then((res) => {
      //     wx.hideLoading()
      //     if (res.data.code !== 200) {
      //       wx.showModal({ title: '登陆失败' })
      //       return
      //     }else {
      //       wx.clearStorage() // 清除之前的用户信息
      //       let token = res.data.data
      //       // setStore({ 'token': token })
      //       wx.setStorageSync('token', token)

      //       toMine() // 登陆成功
      //     }
      //   })
      //   .catch(err => {
      //     wx.hideLoading()
      //     console.log(err)
      //   })
    },
// 获取输入的账号
    getAccount: function (e) {
      this.setData({
        username: e.detail.value
      });
    },
// 获取输入的密码
    getPassword: function (e) {
      this.setData({
        password: e.detail.value
      });
    },
  }
})
