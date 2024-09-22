import { Pagetion } from "@/app/types";

export interface IGetUserInfoParams extends Pagetion {
  name?: string
}

export interface UserDataType {
  id: number;
  email?: string;
  name: string;
  phone?: string;
  account: string;
  status: number;
  avatarUrl?: string;
  description?: string;
  createTime?: string
}