import { CommonResp } from '../types/response.types';

type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
const API_BASE_URL = "https://192.168.31.56:3000/api"; // 测试域名
// const API_BASE_URL = "https://mahoo12138.cn/api"; // 测试域名

export const request = <T>(url: string, method: Method, data?: any) => {
  let _url = API_BASE_URL + url;
  return new Promise<T>((resolve, reject) => {
    const token = wx.getStorageSync("token");
    wx.request<CommonResp<T>>({
      url: _url,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      success(request) {
        if (isSuccess(request.statusCode)) {
          const data = request.data.data;
          resolve(data);
        }else{
          reject(request.data)
        }
      },
      fail(error) {
        reject(error);
      },
      complete(data) {
        // 加载完成
      },
    });
  });
};

const isSuccess = (code: number) => code >= 200 && code < 299

export const errHandler = (reject: Function) => {
  return (err: any) => {
    console.error(err);
    reject(err);
  };
};
