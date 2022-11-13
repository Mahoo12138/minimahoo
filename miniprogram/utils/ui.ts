export const showMessage = (msg: string, type: MsgType = "success", duration?: number) => {
  // @ts-ignore
  wx.lin.showMessage({
    content: msg,
    duration,
    type,
    top: 30,
  });
};
type MsgType = "primary" | "success" | "warning" | "error";
