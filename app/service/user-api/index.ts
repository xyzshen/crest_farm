import fetchApi from '../base/fetchApi';
import api from '../api';
import { IGetUserInfoParams } from './type';

class UserService {
  getUserInfo(data: IGetUserInfoParams) {
    return fetchApi.get(api.user.list, data);
  }
}

export const UserApi = new UserService();