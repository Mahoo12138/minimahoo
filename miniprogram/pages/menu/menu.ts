// pages/menu/menu.ts
import apps from "./app";

Page({
  data: {
    apps: apps,
  },

  // @ts-ignore
  gotoSubApp({ detail }) {
    wx.navigateTo({
      url: detail.cell.url,
      success: () => {},
      fail: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  },
  onShow() {
    wx.hideHomeButton();
  },
  onLoad() {},
  onReady() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
