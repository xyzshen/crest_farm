'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import LoginComponent from '../components/LoginComponent';
import { LoginApi } from '@/app/service/login-api';
import { Base64 } from 'js-base64';
import LoginState from '@/utils/loginState';

export default function Login() {
    const router = useRouter()
    const [code, setCode] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const onFinish = (values: ILoginForm) => {
        const data = {
            accountJsonBase64: Base64.encode(JSON.stringify({ account: values.account, platform: 0 })),
            accountPwd: Base64.encode(values.password)
        }
        LoginApi.login(data, values.code, token).then((res: any) => {
            if (res) {
                LoginState.loginSuccess({ ...res.data })
                router.push('/')
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

    useEffect(() => {
        getpictureCheckCode()
    }, [])

    return <LoginComponent onChangePictureCheckCode={getpictureCheckCode} onCheck={onCheck} onFinish={onFinish} onFinishFailed={onFinishFailed} code={code} />
}
