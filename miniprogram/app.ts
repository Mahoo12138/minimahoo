// app.ts
import { authLogin } from "./common/api";
import { AppGlobalData } from "./types/globaldata.type";

App<AppGlobalData>({
  globalData: {
    user: null,
    token: null,
    isLogin: false,
  },
  onLaunch() {
    this.globalData.token = wx.getStorageSync("token");
    this.globalData.user = wx.getStorageSync("user");
  },

  userLogin() {
    return new Promise((resolve, reject) => {
        authLogin().then((data) => {
        wx.setStorageSync("token", data.token);
        wx.setStorageSync("user", data.user);
        this.globalData.user = data.user;
        this.globalData.isLogin = true;
        resolve(data);
      }).catch((err) => {
        reject(err);
      });;
    });
  },
});
