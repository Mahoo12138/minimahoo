import { AppGlobalData } from "../../types/globaldata.type";
// 获取应用实例
const app = getApp<AppGlobalData>();

Page({
  data: {
    loading: true,
    canIGotoAuth: true,
  },
  // 事件处理函数
  gotoAuth() {
    if (!this.data.canIGotoAuth) {
      const dialog = this.selectComponent("#error-tips");
      // @ts-ignore
      dialog.linShow({
        type: "alert",
        content: "当前服务无法使用",
      });
      return;
    }
    const { user } = app.globalData;
    if (user?.isAuth) {
      wx.reLaunch({
        url: "../list/list",
      });
    } else {
      wx.navigateTo({
        url: "../auth/auth",
      });
    }
  },
  onLoad() {
    const { token , user } = app.globalData;
    if (!token || !user) {
      app
        .userLogin()
        .then(() => {
          this.setData({
            canIGotoAuth: true,
          });
        })
        .catch(() => {
          this.setData({
            loading: false,
            canIGotoAuth: false,
          });
          // @ts-ignore
          wx.lin.showMessage({
            content: "未知错误",
            type: "error",
          });
        })
        .finally(() => {
          this.setData({
            loading: false,
          });
        });
    } else {
      this.setData({
        loading: false,
        canIGotoAuth: true,
      });
    }
  },
});
