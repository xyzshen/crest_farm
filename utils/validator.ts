const validator = {
  isEmail: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
  },
  // 长度超过8位，必须要有英文和数字
  isPassword: (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  },
  // 长度超过6位，除—_外，不能有其他特殊符号，可以是中文，英文，数字，不能是纯数字
  isAccount: (account: string) => {
    const accountNumberRegex = /^(?![0-9]+$)[\u4e00-\u9fa5A-Za-z0-9_-]{6,}$/
    return accountNumberRegex.test(account)
  },
  isCode: (code: string) => {
    return code.length === 6
  },
  isUsername: (username: string) => {
    return username.length >= 6
  }
}

export default validator

export const validateFormItem = (type: string, errorInfo?: string) => ({
  validator(rule: any, value: any) {
    if (!value) {
      return Promise.reject(errorInfo || 'Please enter the correct information')
    }
    if (type === 'email') {
      if (!validator.isEmail(value)) {
        return Promise.reject(errorInfo || 'Please enter a valid email')
      }
    }
    if (type === 'password') {
      if (!validator.isPassword(value)) {
        return Promise.reject(errorInfo || 'Password must be at least 8 characters long and contain letters and numbers')
      }
    }
    if (type === 'account') {
      if (!validator.isAccount(value)) {
        return Promise.reject('Account must be at least 6 characters long and contain letters and numbers')
      }
    }
    if (type === 'code') {
      if (!validator.isCode(value)) {
        return Promise.reject('Verification code must be 6 digits')
      }
    }
    if (type === 'username') {
      if (!validator.isUsername(value)) {
        return Promise.reject('Username must be at least 6 characters long')
      }
    }
    return Promise.resolve()
  }
})