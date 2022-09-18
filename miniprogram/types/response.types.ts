import { User } from "./user.type";

export interface LoginData {
  user: User;
  token: string;
}

export interface VertifyData {
  message: string;
  result: boolean;
}
export interface Sms {
    id: number;
    value: string;
    content :string;
    createAt: string;
}
export type ListData = Sms[]
