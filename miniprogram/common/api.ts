import { LoginData, VertifyData } from "../types/response.types";
import { errHandler, request } from "../utils/util";

const AuthLogin = "/wechat/auth/login";
const AuthVerity = "/wechat/auth/verify";

export const authLogin = (): Promise<LoginData> => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        request<LoginData>(AuthLogin, "POST", res)
          .then((data) => {
            if (data) {
              resolve(data);
            } else {
              errHandler(reject)(data);
            }
          })
          .catch(errHandler(reject));
      },
    });
  });
};

export const authVerify = (data: any): Promise<VertifyData> => {
  return new Promise((resolve, reject) => {
    request<VertifyData>(AuthVerity, "POST", data)
      .then(resolve)
      .catch(errHandler(reject));
  });
};
