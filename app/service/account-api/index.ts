import fetchApi from '../base/fetchApi';
import api from '../api';
import { IAddAccountParams, IGetAccountInfoParams } from './type';

class AccountService {

  // 获取用户信息
  getAccountInfo(data: IGetAccountInfoParams) {
    return fetchApi.get(api.account.userInfo, data);
  }

  // 新增账号
  addAccount(data: IAddAccountParams) {
    return fetchApi.post(api.account.addAccount, data);
  }

  // 修改用户信息
  updateUserInfo(data: any) {
    return fetchApi.put("/api/userInfo", data);
  }

  // 修改用户密码
  updatePassword(data: any) {
    return fetchApi.put(api.user.updatePassword, data);
  }
}

export const AccountApi = new AccountService();