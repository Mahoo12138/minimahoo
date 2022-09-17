import { User } from "./user.type";

export interface AppGlobalData {
  globalData: {
    user: User | null;
    isLogin: boolean;
  };
  userLogin: Function
}
