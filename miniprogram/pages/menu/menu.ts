// pages/menu/menu.ts
import { getPhoneInfo } from "../../common/api";
import { PhoneInfo } from "../../types/phone.type";
import { showMessage } from "../../utils/ui";
import apps from "./app";

Page({
  data: {
    apps: apps,
    phone: {} as PhoneInfo,
    loading: true,
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
  onLoad() {
    getPhoneInfo().then((data)=>{
        this.setData({
            phone: data,
            loading: false
        })
    }).catch(() => {
        showMessage("获取手机信息失败", "error");
    })
    setTimeout(()=>{
        if(this.data.loading){
            showMessage("加载缓慢，手机可能处于睡眠模式", "warning")
        }
    },5000)
  },
  onReady() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
