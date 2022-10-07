import { User } from "./user.type";

export interface LoginData {
  user: User;
  token: string;
}

export interface VertifyData {
  message: string;
  result: boolean;
}

export interface CommonResp<T> {
  code: number;
  data: T;
  error: string;
  message: string;
}
