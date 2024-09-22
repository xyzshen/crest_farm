

'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Register from '../components/Register';
import { LoginApi } from '@/app/service/login-api';
import { Base64 } from 'js-base64';
import { message } from 'antd';
import LoginState from '@/utils/loginState';

export default function Login() {
    const router = useRouter()
    const [code, setCode] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const onFinish = (values: IRegisterParams) => {
        const data = {
            ...values,
            password: Base64.encode(values.password),
            confirmPassword: Base64.encode(values.confirmPassword),
        }
        LoginApi.register(data).then((res: any) => {
            if (res) {
                // LoginState.loginSuccess({ ...res.data }
                message.success('Register successfully, please log in')
                router.push('/login')
            }
        }).catch((err) => {
            getpictureCheckCode()
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const getpictureCheckCode = () => {
        LoginApi.getpictureCheckCode().then((res: any) => {
            if (res) {
                // 添加base64图片标志
                setCode(`data:image/png;base64,${res.data?.base64Image}`)
                setToken(res.data?.token)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const onCheck = (value: string) => {
        router.push(value)
    }

    const onSendEmail = async (values: string) => {
        const req = {
            email: values,
            purpose: 'register'
        }
        await LoginApi.sendEmail(req);
        message.success('Email sent successfully')
    }

    useEffect(() => {
        getpictureCheckCode()
    }, [])
    return (
        <Register onChangePictureCheckCode={getpictureCheckCode} onSendEmail={onSendEmail} onCheck={onCheck} onFinish={onFinish} onFinishFailed={onFinishFailed} code={code} />
    )
}