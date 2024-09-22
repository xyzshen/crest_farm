'use cilent';

class LoginState {
  loginSuccess(data: any) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  isLogin() {
    return localStorage.getItem("token");
  }
  clearLoginState() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  }
  getToken() {
    return localStorage.getItem("token");
  }
  getUserInfo() {
    if (typeof window !== 'undefined' && localStorage.getItem("userInfo")) {
      return JSON.parse(localStorage.getItem("userInfo") || "{}");
    }
    return null
  }
}

export default new LoginState();