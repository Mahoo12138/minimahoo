// pages/menu/menu.ts
import { getPhoneInfo, sendMessage } from "../../common/api";
import { PhoneInfo } from "../../types/phone.type";
import apps from "./app";

Page({
  data: {
    apps: apps,
    phone: {} as PhoneInfo,
    loading: true,
    message: "",
  },
  hanldeSendMsg() {
    console.log(this.data.message);
    sendMessage({
      title: "小黄后花园",
      content: this.data.message,
    })
      .then(() => {
        this.showToast("发送成功", "success");
      })
      .catch(() => {
        this.showToast("发送失败", "error");
      });
  },
  // top/left/right/bottom
  showToast(content: string, icon?: string, placement = "bottom") {
    const toast = this.selectComponent("#my-toast");
    toast.linShow({
      title: content,
      icon,
      placement,
    });
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
  handleTimer() {
    setInterval(() => {
      let phone = this.data.phone;
      if (phone?.Uptime) {
        let seconds = phone.Uptime.pop() || 0;
        let minutes = phone.Uptime.pop() || 0;
        let hours = phone.Uptime.pop() || 0;
        if (seconds++ === 59) {
          minutes++;
          seconds = 0;
        }
        if (minutes === 59) {
          minutes = 0;
          hours++;
        }
        this.setData({
          phone: {
            ...phone,
            Uptime: [...phone.Uptime, hours, minutes, seconds],
          },
        });
      }
    }, 1000);
  },
  onShow() {
    wx.hideHomeButton();
    this.handleTimer();
  },
  onLoad() {
    // getPhoneInfo()
    //   .then((data) => {
    //     data.Uptime.push((Math.random() * 60) | 0);
    //     this.setData({
    //       phone: data,
    //       loading: false,
    //     });
    //   })
    //   .catch(() => {
    //     this.showToast("获取手机信息失败", "error");
    //   });
    // setTimeout(() => {
    //   if (this.data.loading) {
    //     this.showToast("当前网络加载缓慢，手机可能处于睡眠模式");
    //   }
    // }, 3000);
  },
  onReady() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
