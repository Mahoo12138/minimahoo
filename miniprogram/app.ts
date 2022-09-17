// app.ts
import { AppGlobalData } from './types/globaldata.type';
import { LoginData } from './types/response.types';
import { request } from './utils/util'

App<AppGlobalData>({
  globalData: {
    user: null,
    isLogin: false
  },
  onLaunch() {},

  userLogin(){
      return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
              request<LoginData>('/auth/login', "POST", res).then((data) =>{
                  if(data){
                      wx.setStorageSync("token", data.token);
                      this.globalData.user = data.user;
                      this.globalData.isLogin = true;
                      resolve(data)
                  }else{
                      reject(data);
                  }
              }).catch(err=>{
                  console.warn(err)
                  reject(err);
              })
            },
          })
      })
  }
})