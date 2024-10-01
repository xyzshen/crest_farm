'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import LoginComponent from '../components/LoginComponent';
import { LoginApi } from '@/app/service/login-api';
import { Base64 } from 'js-base64';
import LoginState from '@/utils/loginState';
import ForgotPass from '../components/ForgotPass';
import { message } from 'antd';

export default function Forgot() {
  const router = useRouter()

  const onFinish = (values: IForgetPasswordParams) => {
    const data = {
      ...values,
      newPassword: Base64.encode(values.newPassword),
      confirmPassword: Base64.encode(values.confirmPassword),
    }
    LoginApi.forgetPassword(data).then((res: any) => {
      if (res) {
        message.success('Password reset successfully, please log in')
        router.push('/login')
      }
    }).catch((err) => {

    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const onCheck = (value: string) => {
    router.push(value)
  }

  const onSendEmail = async (values: string) => {
    const req = {
      email: values,
      purpose: 'forgetPassword'
    }
    await LoginApi.sendEmail(req);
    message.success('Email sent successfully')
  }

  return <ForgotPass onCheck={onCheck} onFinish={onFinish} onFinishFailed={onFinishFailed} onSendEmail={onSendEmail} />
}
