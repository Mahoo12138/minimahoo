export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};
type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
const API_BASE_URL = "http://192.168.31.102:8080/wxapi"; // 测试域名

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
