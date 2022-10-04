// app.ts
import { AuthLogin } from "./common/api";
import { AppGlobalData } from "./types/globaldata.type";
import { LoginData } from "./types/response.types";
import { request } from "./utils/util";

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
      wx.login({
        success: (res) => {
          request<LoginData>(AuthLogin, "POST", res)
            .then((data) => {
              if (data) {
                wx.setStorageSync("token", data.token);
                wx.setStorageSync("user", data.user);
                this.globalData.user = data.user;
                this.globalData.isLogin = true;
                resolve(data);
              } else {
                reject(data);
              }
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        },
      });
    });
  },
});
