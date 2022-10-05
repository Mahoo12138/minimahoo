type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
const API_BASE_URL = "https://192.168.31.56:3000/api"; // 测试域名
// const API_BASE_URL = "https://mahoo12138.cn/api"; // 测试域名

export const request = <T>(url: string, method: Method, data?: any) => {
  let _url = API_BASE_URL + url;
  return new Promise<T>((resolve, reject) => {
    const token = wx.getStorageSync("token");
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      success(request) {
        // @ts-ignore
        const data = request.data.data as T;
        resolve(data);
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

export const errHandler = (reject: Function) => {
  return (err: any) => {
    console.error(err);
    reject(err);
  };
};
