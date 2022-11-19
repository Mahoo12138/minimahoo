import { PhoneInfo } from "../types/phone.type";
import { LoginData, VertifyData } from "../types/response.types";
import { User } from "../types/user.type";
import { errHandler, request } from "../utils/http";

// url
const AuthLogin = "/wechat/auth/login";
const AuthVerity = "/wechat/auth/verify";
const GetPhoneInfo = "/android/info";
const SendMessage = "/android/message";
const UserFind = (id: number) => `/wechat/user/${id}`;

// request
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

export const getPhoneInfo = (): Promise<PhoneInfo> => {
  return new Promise((resolve, reject) => {
    request<PhoneInfo>(GetPhoneInfo, "GET")
      .then(resolve)
      .catch(errHandler(reject));
  });
};

export const sendMessage = (data) => {
  return request(SendMessage, "POST", data)
};

export const getUser = (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    request<User>(UserFind(id), "GET").then(resolve).catch(errHandler(reject));
  });
};

export const patchUser = (id: number, data: any) => {
  return new Promise((resolve, reject) => {
    request(UserFind(id), "PUT", data).then(resolve).catch(errHandler(reject));
  });
};
