interface ILoginParams {
  accountJsonBase64: string;
  accountPwd: string;
}

interface IRegisterParams {
  account: string;
  email: string;
  confirmPassword: string;
  password: string;
  emailValidCode: string;
}


type TPurpose = 'register' | 'forgetPassword'

interface ISendMessageParams {
  purpose: string;
  email: string
}
type IForgetPasswordParams = Pick<IRegisterParams, 'confirmPassword' | 'emailValidCode'> & {
  userEmail: string;
  newPassword: string
}