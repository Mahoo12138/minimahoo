import { Sms } from "../../types/sms.type";
import { formatTime } from "../../../../utils/time";
import { showMessage } from "../../../../utils/ui";
import { getList } from "../../common/api";

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
    getList()
      .then((data) => {
        this.setData({
          latestSms: this.formatDate(data[0]),
          smsList: data.slice(1).map(this.formatDate) as Sms[],
        });
        if (initial) {
          setTimeout(() => {
            showMessage("刷新成功");
          },500);
        }
      })
      .catch(() => {
        showMessage("刷新失败", "error");
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
      showMessage("复制失败", "error");
    }
  },
  copyOtherCode(event: any) {
    const { code } = event.currentTarget.dataset;
    if (code) {
      this.copyCodeValue(code);
    } else {
      showMessage("复制失败", "error");
    }
  },
  copyCodeValue(code: string) {
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.hideToast();
        showMessage("复制成功");
      },
    });
  },

  formatDate(sms: Sms) {
    if(!sms) return;
    const date = formatTime(new Date(sms.createAt));
    sms.createAt = date;
    return sms;
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
