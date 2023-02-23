
import common from '~/behaviors/common';

// @ts-ignore
const app = getApp()

Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
    },
    isShowLogin: false,
    activeIndex: 0,
    height: app.globalData.statusBarHeight + app.globalData.navBarHeight,
    phone: '',
    password: '',
    code: '',
    isPhoneLogin: true,
    isPhoneFocus: false,
    isPasswdFocus: false
  },
  behaviors: [common],
  openLoginDialog() {
    this.setData({
      isShowLogin: true
    })
    // wx.navigateTo({
    //   url: '/packages/hippus/pages/login/login',
    //   success: () => {},
    //   fail: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {},
    // });
  },
  handleFocusInput(target: string) {
    console.log("focus", target);
    const data = this.getEventData(target)
    this.setData({
      [`is${data.field}Focus`]: true
    })
  },
  handleBlurInput(target: string) {
    console.log("blur", target);
    const data = this.getEventData(target)
    this.setData({
      [`is${data.field}Focus`]: false
    })
  },
  handlePasswdLogin() {
    console.log("fasdfas");
    this.setData({
      activeIndex: 1
    })
  },
  handleCodeLogin() {

  },
  handleLoginType() {
    console.log("false");
    this.setData({
      activeIndex: 1,
    })
  },
  onLoad() {

  },
  onReady() {

  },
  onShow() {

  },

  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})