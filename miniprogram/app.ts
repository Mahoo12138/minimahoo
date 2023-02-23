// app.ts
import { authLogin } from "./common/api";
import { AppGlobalData } from "./types/globaldata.type";

App<AppGlobalData>({
    globalData: {
        statusBarHeight: 0,
        navBarHeight: 0,
        user: null,
        token: null,
        isLogin: false,
    },
    onLaunch() {
        this.globalData.token = wx.getStorageSync("token");
        this.globalData.user = wx.getStorageSync("user");
        //自定义导航栏 获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
        wx.getSystemInfo({
            success: (res) => {
                let custom = wx.getMenuButtonBoundingClientRect()
                this.globalData.statusBarHeight = res.statusBarHeight
                this.globalData.navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
            }
        })
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
