'use cilent';

class LoginState {
  loginSuccess(data: any) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  }
  isLogin() {
    return sessionStorage.getItem("token");
  }
  clearLoginState() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
  }
  getToken() {
    return sessionStorage.getItem("token");
  }
  getUserInfo() {
    if (typeof window !== 'undefined' && sessionStorage.getItem("userInfo")) {
      return JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    }
    return null
  }
}

export default new LoginState();