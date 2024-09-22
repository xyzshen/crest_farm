import fetchApi from "../base/fetchApi";
import api from "../api";
import { urlParamsFull } from "@/utils";

class LoginService {
  // 登录
  login(data: ILoginParams, code?: string, token?: string): Promise<any> {
    return fetchApi.post(`${api.common.login}?checkCode=${code}`, data, {
      headers: {
        token: `${token}`,
        'type': 'form'
      }
    });
  }
  // 获取验证码
  getpictureCheckCode(): Promise<any> {
    return fetchApi.get(api.common.getpictureCheckCode);
  }
  register(data: IRegisterParams): Promise<any> {
    return fetchApi.post(api.common.register, data);
  }
  sendEmail(data: ISendMessageParams): Promise<any> {
    const reqUrl = urlParamsFull(api.common.sendEmail, data);
    return fetchApi.post(reqUrl, {});
  }
  forgetPassword(data: IForgetPasswordParams): Promise<any> {
    return fetchApi.post(api.common.forgetPassword, data);
  }
}

export const LoginApi = new LoginService();