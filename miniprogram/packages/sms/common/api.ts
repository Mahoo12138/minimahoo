import { errHandler, request } from "../../../utils/util";
import { ListData } from "../types/sms.type";

const CodeList = "/wechat/code";

export const getList = ():Promise<ListData> => {
  return new Promise((resolve, reject) => {
    request<ListData>(CodeList, "GET").then(resolve).catch(errHandler(reject));
  });
};
