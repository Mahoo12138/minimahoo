export const showMessage = (msg: string, type: MsgType = "success", duration?: number) => {
  // @ts-ignore
  wx.lin.showMessage({
    content: msg,
    duration,
    type,
  });
};
type MsgType = "primary" | "success" | "warning" | "error";
