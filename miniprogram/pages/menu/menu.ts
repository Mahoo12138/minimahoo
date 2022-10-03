// pages/menu/menu.ts
import apps from "./app";

Page({
  data: {
    apps: apps,
  },

  gotoSubApp({ detail }) {
    console.log(detail.cell);
    wx.navigateTo({
      url: detail.cell.url,
      success: () => {},
      fail: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  },
  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
