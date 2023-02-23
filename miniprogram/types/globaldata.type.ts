import { User } from "./user.type";

export interface AppGlobalData {
  globalData: {
    user: User | null;
    token: string | null;
    isLogin: boolean;
    statusBarHeight: number;
    navBarHeight: number;
  };
  userLogin: Function
}
