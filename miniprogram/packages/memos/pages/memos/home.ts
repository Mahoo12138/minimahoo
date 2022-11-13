// pages/home/index.js
import { Event } from '../../../../types/other.type';
import { changeMemoPinned, deleteMemo, editMemo, getMeInfo, getMemos, sendMemo } from '../../common/api';
import { formatMemoContent, parseHtmlToRawText } from "../../common/marked";
import { calTime, memosArrenge } from '../../common/utils'
import { Memo } from '../../types/memo.type';
const app = getApp();

Page({
  data: {
    openId: '',
    halfDialog: "closeHalfDialog",
    edit: false,
    editMemoId: 0,
    memos: [] as Memo[],
    showMemos: [] as Memo[],
    memo: "",
    onlineColor: "#eeeeee",
    showArchived: false,
    sendLoading: false,
    me: ""
  },

  onLoad(options) {
    var that = this;
    this.setData({
      top_btn: app.globalData.top_btn,
    });
    wx.getStorage({
      key: "memos-openId",
      // encrypt: true,
      success(res) {
        console.log(res.data)
        app.globalData.openId = res.data;
        that.setData({
          url: app.globalData.url,
          openId: res.data,
          onlineColor: "#FCA417",
        });
        var openId = res.data;
        wx.getStorage({
          key: "memos",
          success(res) {
            that.setData({
              memos: res.data,
              showMemos: res.data.slice(0, 10),
            });
            that.getMemos(openId);
            that.getMe(openId)
          },
          fail(err) {
            console.log(err);
            that.getMemos(openId);
          },
        });
      },
      fail(err) {
        console.log(err);
        wx.redirectTo({
          url: "../welcom/index",
        });
      },
    });
  },

  getMe(openId: string){
    getMeInfo(openId).then(res =>{
        this.setData({
            me: res.name
        })
    })
  },

  onReachBottom() {
    var memos = this.data.memos;
    var showMemos = this.data.showMemos;
    if (showMemos.length == memos.length) {
      wx.vibrateShort({ type: "light" });
      wx.showToast({
        icon: "none",
        title: "已全部加载",
      });
    } else {
      this.setData({
        showMemos: memos.slice(0, showMemos.length + 5),
      });
    }
  },

  inputTag() {
    this.setData({
      memo: this.data.memo + "#tag ",
    });
  },

  inputTodo() {
    wx.vibrateShort({
      type: 'light'
    });
    wx.showToast({
      icon: "none",
      title: " - [x] 表示done",
    });
    this.setData({
      memo: this.data.memo + " - [ ] ",
    });
  },

  inputCode() {
    console.log(this.data.memo + "\n```\n```");
    this.setData({
      memo: this.data.memo + "\n```\n```",
    });
  },

  changeMemoPinned(e: Event) {
    console.log(e.detail.memoid);
    console.log(e.detail.pinned);
    var data = {
      pinned: !e.detail.pinned,
    };
    var that = this;
    changeMemoPinned(this.data.openId, e.detail.memoid, data)
      .then((data) => {
        console.log(data);
        if (data) {
          wx.vibrateShort({ type: "light" });
          if (!e.detail.pinned) {
            wx.showToast({
              icon: "none",
              title: "已置顶",
            });
          } else {
            wx.showToast({
              icon: "none",
              title: "已取消置顶",
            });
          }
          var memos = that.data.memos;
          for (let i = 0; i < memos.length; i++) {
            if (memos[i].id == e.detail.memoid) {
              memos[i].pinned = !e.detail.pinned;
            }
          }
          var arrMemos = memosArrenge(memos);
          console.log(arrMemos);
          that.setData({
            memos: arrMemos,
            showMemos: arrMemos.slice(0, that.data.showMemos.length),
          });
          app.globalData.memos = arrMemos;
          wx.setStorage({
            key: "memos",
            data: arrMemos,
          });
        }
      });
  },

  changeshowArchived() {
    wx.vibrateShort({
      type: 'light'
    });
    this.setData({
      showArchived: !this.data.showArchived,
    });
  },

  memoInput(e: Event) {
    // console.log(e.detail.value)
    this.setData({
      memo: e.detail.value,
    });
  },

  dialogEdit(e: Event) {
    // console.log(e)
    this.setData({
      halfDialog: "showHalfDialog",
      edit: true,
      editMemoId: e.detail.memoid,
      memo: e.detail.content,
    });
  },

  getMemos(openId: string) {
    var that = this;
    getMemos(openId).then((memos) => {
      console.log(memos);
      if (!memos) {
        wx.redirectTo({
          url: "../welcom/index",
        });
      } else {
        for (let i = 0; i < memos.length; i++) {
          const ts = memos[i].createdTs;
          memos[i].time = calTime(ts);
          //memos原版解析
          let md = formatMemoContent(memos[i].content);
          memos[i].formatContent = md;
        }
        var arrMemos = memosArrenge(memos);
        that.setData({
          memos: arrMemos,
          showMemos: arrMemos.slice(0, 10),
          onlineColor: "#07C160",
        });
        app.globalData.memos = arrMemos;
        wx.setStorage({
          key: "memos",
          data: arrMemos,
        });
      }
    });
  },

  dialog() {
    var that = this;
    var content = this.data.memo;
    if (content !== "") {
      this.setData({
        sendLoading: true,
      });
      if (!this.data.edit) {
        this.sendMemo();
      } else {
        var openId = this.data.openId;
        var id = this.data.editMemoId;
        var data = {
          content: content,
        };
        that.editMemoContent(openId, id, data);
      }
    } else {
      wx.vibrateLong();
      wx.showToast({
        icon: "none",
        title: "内容不能为空",
      });
    }
  },

  editMemoContent(openId: string, id: number, data: any) {
    var that = this;
    editMemo(openId, id, data).then((data) => {
      console.log("editMemoContent", data);
      if (data) {
        var memos = that.data.memos;
        for (let i = 0; i < memos.length; i++) {
          if (memos[i].id == that.data.editMemoId) {
            memos[i].content = that.data.memo;
            memos[i].formatContent = formatMemoContent(that.data.memo);
          }
        }
        that.setData({
          memos: memos,
          showMemos: memos.slice(0, that.data.showMemos.length),
          halfDialog: "closeHalfDialog",
          sendLoading: false,
          memo: "",
          editMemoId: 0,
          edit: false,
        });
        wx.vibrateShort({ type: "light" });
        wx.showToast({
          icon: "none",
          title: "已更改",
        });
        app.globalData.memos = memos;
        wx.setStorage({
          key: "memos",
          data: memos,
        });
      } else {
        wx.showToast({
          icon: "none",
          title: "编辑失败",
        });
        that.setData({
          sendLoading: false,
        });
      }
    });
  },

  editMemoRowStatus(openId: string, id: number, data: any) {
    var that = this;
    editMemo(openId, id, data).then((data) => {
      console.log(data);
      if (data) {
        var memos = that.data.memos;
        for (let i = 0; i < memos.length; i++) {
          if (memos[i].id == id) {
            memos[i].rowStatus = data.rowStatus;
          }
        }
        that.setData({
          memos: memos,
          showMemos: memos.slice(0, that.data.showMemos.length),
        });
        wx.vibrateShort({ type: "light" });
        wx.showToast({
          icon: "none",
          title: "归档状态已更改",
        });
        app.globalData.memos = memos;
        wx.setStorage({
          key: "memos",
          data: memos,
        });
      }
    });
  },

  sendMemo() {
    var content = this.data.memo;
    var openId = this.data.openId;
    var memos = this.data.memos;
    var that = this;
    sendMemo(openId, content).then((data) => {
      if (data) {
        wx.vibrateShort({ type: "light" });
        var newmemo = data;
        newmemo.time = calTime(newmemo.createdTs);
        let md = formatMemoContent(newmemo.content);
        newmemo.formatContent = md;
        memos.unshift(newmemo);
        var arrMemos = memosArrenge(memos);
        that.setData({
          memos: arrMemos,
          showMemos: arrMemos.slice(0, this.data.showMemos.length + 1),
          sendLoading: false,
          memo: "",
        });
        app.globalData.memos = arrMemos;
        wx.setStorage({
          key: "memos",
          data: arrMemos,
        });
      } else {
        wx.vibrateLong();
        wx.showToast({
          icon: "none",
          title: "发送失败",
        });
        that.setData({
          sendLoading: false,
        });
      }
    });
  },

  deleteMemoFaker(e: Event) {
    console.log(e.detail.rowstatus);
    var data = {
      rowStatus: e.detail.rowstatus == "NORMAL" ? "ARCHIVED" : "NORMAL",
    };
    var openId = this.data.openId;
    var id = e.detail.memoid;
    this.editMemoRowStatus(openId, id, data);
  },

  deleteMemo(e: Event) {
    var that = this;
    var memos = this.data.memos;
    var id = e.detail.memoid;
    console.log(e.detail.memoid);
    wx.vibrateLong();
    deleteMemo(this.data.openId, id).then((data) => {
      if (data) {
        for (let i = 0; i < memos.length; i++) {
          if (memos[i].id == id) {
            memos.splice(i, 1);
          }
          var arrMemos = memosArrenge(memos);
          that.setData({
            memos: arrMemos,
            showMemos: arrMemos.slice(0, that.data.showMemos.length),
          });
          app.globalData.memos = arrMemos;
          wx.setStorage({
            key: "memos",
            data: arrMemos,
          });
        }
        wx.showToast({
          icon: "none",
          title: "已删除！",
        });
      } else {
        wx.showToast({
          icon: "none",
          title: "something wrong",
        });
      }
    });
  },

  goWelcom() {
    wx.vibrateShort({ type: "light" });
    wx.navigateTo({
      url: "../welcom/index",
    });
  },

  goSearch() {
    wx.vibrateShort({ type: "light" });
    wx.navigateTo({
      url: "../search/index",
    });
  },

  changeCloseMemo() {
    wx.vibrateShort({ type: "light" });
    if (this.data.halfDialog == "showHalfDialog" && this.data.edit) {
      this.setData({
        halfDialog: "closeHalfDialog",
        memo: "",
        editMemoId: 0,
        edit: false,
      });
    } else if (this.data.halfDialog == "closeHalfDialog") {
      this.setData({
        halfDialog: "showHalfDialog",
      });
    } else {
      this.setData({
        halfDialog: "closeHalfDialog",
      });
    }
  },

  copy(e : Event) {
    console.log(e);
    wx.vibrateShort({ type: "light" });
    wx.setClipboardData({
      data: e.target.dataset.content,
    });
  },
});
