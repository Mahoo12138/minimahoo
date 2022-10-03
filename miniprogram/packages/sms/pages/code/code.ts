import { ListData, Sms } from "../../../../types/response.types";
import { formatTime, request } from "../../../../utils/util";

// pages/list/list.ts
Page({
  data: {
    latestSms: {} as Sms,
    smsList: [] as Sms[],
    refreshLoading: false,
  },
  refreshData(initial = true) {
    this.setData({
      refreshLoading: true,
    });
    request<ListData>("/wechat/code", "GET")
      .then((data) => {
        this.setData({
          latestSms: this.formatDate(data[0]),
          smsList: data.slice(1).map(this.formatDate),
        });
        if (initial) {
          setTimeout(() => {
            this.showMessage("刷新成功");
          },500);
        }
      })
      .catch((err) => {
        this.showMessage("刷新失败", "error");
        console.warn(err);
      })
      .finally(() => {
        setTimeout(() => {
          this.setData({
            refreshLoading: false,
          });
          wx.stopPullDownRefresh();
        }, 1200);
      });
  },
  copyLatestCode() {
    const { value } = this.data.latestSms;
    if (value) {
      this.copyCodeValue(value);
    } else {
      this.showMessage("复制失败", "error");
    }
  },
  copyOtherCode(event: any) {
    const { code } = event.currentTarget.dataset;
    if (code) {
      this.copyCodeValue(code);
    } else {
      this.showMessage("复制失败", "error");
    }
  },
  copyCodeValue(code: string) {
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.hideToast();
        this.showMessage("复制成功");
      },
    });
  },

  formatDate(sms: Sms) {
    if(!sms) return;
    const date = formatTime(new Date(sms.createAt));
    sms.createAt = date;
    return sms;
  },
  showMessage(msg: string, type = "success") {
    // @ts-ignore
    wx.lin.showMessage({
      content: msg,
      type,
    });
  },
  onLoad() {
    this.refreshData(false);
  },
  onReady() {},
  onShow() {
    wx.hideHomeButton();
  },
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {
    this.refreshData();
  },
  onReachBottom() {},
  onShareAppMessage() {},
});
