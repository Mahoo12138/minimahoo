import { getUser, patchUser } from "../../../../common/api";
import { showMessage } from "../../../../utils/ui";
import { signIn, signUp } from "../../common/api";

// pages/welcom/index.js
var app = getApp();

Page({
  data: {
    email: "",
    password: "",
    btnDisable: false,
    alreadyBind: false
  },
  copy() {
    wx.setClipboardData({
      data: app.globalData.url,
    });
  },

  creatUser() {
    if (this.data.alreadyBind) {
      wx.redirectTo({
        url: '../memos/home',
      })
      return;
    }
    this.setData({
      btnDisable: true,
    });
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(this.data.email)) {
      wx.vibrateLong();
      wx.showToast({
        icon: "none",
        title: "邮箱格式错误",
      });
      this.setData({
        btnDisable: false,
      });
    } else if (this.data.password.length < 6) {
      wx.vibrateLong();
      wx.showToast({
        icon: "none",
        title: "密码长度需大于六位",
      });
      this.setData({
        btnDisable: false,
      });
    } else {
      const data = {
        email: this.data.email,
        password: this.data.password,
      }
      signUp(data).then((data) => {
        console.log(data);
        // var code = res.result.statusCode;
        // console.log(res);
        // if (!code) {
        //   //创建成功
        //   wx.vibrateShort();
        //   wx.showToast({
        //     title: "创建成功",
        //   });
        //   var openId = res.result.data.openId;
        //   wx.setStorage({
        //     key: "openId",
        //     data: openId,
        //     // encrypt: true,
        //     success(res) {
        //       console.log(res);
        //       wx.redirectTo({
        //         url: "../home/index",
        //       });
        //     },
        //     fail(err) {
        //       wx.showToast({
        //         title: "something wrong",
        //       });
        //     },
        //   });
        // } else if (code == 500) {
        //   app.api
        //     .signIn(that.data.url, {
        //       email: that.data.email,
        //       password: that.data.password,
        //     })
        //     .then((res) => {
        //       if (res.data) {
        //         console.log(res.data.openId);
        //         wx.vibrateShort();
        //         wx.showToast({
        //           title: "登录成功",
        //         });
        //         wx.setStorage({
        //           key: "openId",
        //           data: res.data.openId,
        //           // encrypt: true,
        //           success(res) {
        //             console.log(res);
        //             wx.redirectTo({
        //               url: "../home/index",
        //             });
        //           },
        //           fail(err) {
        //             wx.showToast({
        //               title: "something wrong",
        //             });
        //           },
        //         });
        //       } else {
        //         console.log(res);
        //         wx.vibrateLong();
        //         wx.showToast({
        //           icon: "none",
        //           title: "密码错误",
        //         });
        //         that.setData({
        //           btnDisable: false,
        //         });
        //       }
        //     });
        // } else {
        //   wx.vibrateLong();
        //   wx.showToast({
        //     icon: "none",
        //     title: "something wrong",
        //   });
        //   that.setData({
        //     btnDisable: false,
        //   });
        // }
      }).catch(() => {
        signIn(data).then(data => {
          console.log(data)
          patchUser(app.globalData.user.id, { ...app.globalData.user, memosId: data.user.id })
          wx.setStorageSync("memos-openId", data.user.openId)
          wx.showToast({
            icon: "success",
            title: "登录绑定成功",
          });
          wx.redirectTo({
            url: '../memos/home',
          })
        });
      });
    }
  },
  onLoad() {
    wx.showLoading({
      title: "加载中",
    });
    app.globalData.top_btn = wx.getMenuButtonBoundingClientRect()
    
    const user = app.globalData.user;
    getUser(user.id).then((data) => {
      wx.hideLoading();
      if (data.memosId) {
        this.setData({
          alreadyBind: true
        })
        wx.setStorageSync("memos-openId", data.memosKey)
      } else {
        wx.showToast({
          title: "账号未绑定麦默",
          icon: "error",
          duration: 2000,
        });
      }
    });
  },

  onReady() { },

  onShow() { },

  onHide() { },

  onUnload() { },

  onPullDownRefresh() { },

  onReachBottom() { },

  onShareAppMessage() { },
});
