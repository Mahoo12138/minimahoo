import { AppGlobalData } from "../../types/globaldata.type";
import { VertifyData } from "../../types/response.types";
import { request } from "../../utils/util"
// 获取应用实例
const app = getApp<AppGlobalData>();
Page({
    data: {
        nickname: "",
        phone: null,
        phoneRules: [{
            required: true,
            message: "手机尾号为必填"
          },
          {
            min: 4,
            max: 4,
            message: '需要四位数字'
          }
        ],
        nameRules: {
            required: true,
            message: "昵称为必填"
          },
    },

    showMessage(msg: string, type = "success"){
        // @ts-ignore
        wx.lin.showMessage({
            content:msg,
            type,
        })
    },
    confirmVerify() {
        const { nickname, phone } = this.data
        if(!phone){
            this.showMessage("请输入手机尾号")
            return;
        }
        if(!nickname){
            this.showMessage("请输入昵称")
            return;
        }
        const data = {
            userid: app.globalData.user?.id,
            nickname,
            phone
        }
        request<VertifyData>('/auth/verify', "POST", data).then(data => {
            if(data.result){
                this.showMessage("授权成功")
                setTimeout(()=> {
                    wx.redirectTo({
                        url: "../list/list",
                      });
                },200)
            }else{
                this.showMessage(data.message, "error")
            }
        }).catch(err => {
            this.showMessage("未知错误", "error")
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})