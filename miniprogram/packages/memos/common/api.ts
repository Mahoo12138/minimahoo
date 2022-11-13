import { errHandler, request } from "../../../utils/http";
import { Memo } from "../types/memo.type";

const MemosSignIn = "/auth/signin";
const MemosSignUp = "/auth/signup";
const MemosMe = "/user/me?openId=";
const MemosList = (openId: string) => `/memo?openId=${openId}`;
const MemoItem = (id: number, openId?: string) =>
  `/memo/${id}?openId=${openId}`;
const MemoItemPinned = (id: number, openId?: string) =>
  `/memo/${id}/organizer?openId=${openId}`;
const MemoTags = (openId?: string) => `/memo/tag?openId=${openId}`;

const memosHandler = (title: string, reject: Function) => {
  return (err: any) => {
    wx.vibrateLong();
    wx.showToast({
      icon: "error",
      title,
    });
    errHandler(reject)(err);
  };
};

export const getMemos = (openId: string): Promise<Memo[]> => {
  return new Promise((resolve, reject) => {
    request<Memo[]>(MemosList(openId), "GET")
      .then(resolve)
      .catch(memosHandler("获取失败", reject));
  });
};

export const sendMemo = (openId: string, content: string): Promise<Memo> => {
  return new Promise((resolve, reject) => {
    request<Memo>(MemosList(openId), "POST", { content })
      .then(resolve)
      .catch(memosHandler("发送失败", reject));
  });
};

export const deleteMemo = (openId: string, memoId: number) => {
  return new Promise((resolve, reject) => {
    request(MemoItem(memoId, openId), "DELETE")
      .then(resolve)
      .catch(memosHandler("删除失败", reject));
  });
};

export const editMemo = (
  openId: string,
  memoId: number,
  data: any
): Promise<Memo> => {
  return new Promise((resolve, reject) => {
    request<Memo>(MemoItem(memoId, openId), "PUT", data)
      .then(resolve)
      .catch(memosHandler("更新失败", reject));
  });
};

export const changeMemoPinned = (openId: string, memoId: number, data: any) => {
  return new Promise((resolve, reject) => {
    request(MemoItemPinned(memoId, openId), "POST", data)
      .then(resolve)
      .catch(memosHandler("置顶失败", reject));
  });
};

export const getTags = (openId: string) => {
  return new Promise((resolve, reject) => {
    request(MemoTags(openId), "GET")
      .then(resolve)
      .catch(memosHandler("获取失败", reject));
  });
};

export const signIn = (data: any) => {
  return new Promise((resolve, reject) => {
    request(MemosSignIn, "POST", data)
      .then(resolve)
      .catch(memosHandler("操作失败", reject));
  });
};

export const signUp = (data: any) => {
  return request(MemosSignUp, "POST", data);
};

export const getMeInfo = (openId: string) => {
  return request(MemosMe + openId, "GET");
};
