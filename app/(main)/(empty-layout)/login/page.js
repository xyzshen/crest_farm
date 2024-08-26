'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, Space, Form, Input } from 'antd';
import Image from "next/image";
import Link from "next/link";
import loginLogo from "/public/static/images/login_logo.png";

export default function Login() {
    const router = useRouter()
    const [isShowType, setIsShowType] = useState(1);
    const onFinish = (values) => {
        console.log('Success:', values);
        if (typeof window !== 'undefined') {
            window && window.sessionStorage.setItem('accountNumber', values.accountNumber)
        }


        router.push('/tradingPost')

    };
    const code = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAA8CAIAAAD+Gl+NAAAD5klEQVR42u2dXW4cIQzH5xx9rtQj5AY9Q5ULVKqivvZaVV9zqTz2bbvSSmgE2P77A2ahRijZJCww/MbGNp7s8fH3lnWnejy+GQrV43N2ZejtObsSl+u4ZdmrJNEkmiWJZkmiWZJoliSaRLMk0SxJNEsSzZJEk2gWvvx+/9OtSVRRfv74da5R3X57/WSg6GnTfct/R7TCGYX2jrOqIbN9+/L1Xhk57oL3iPuxDU4P1BZngerRqA+cVa2EEpTdPYmKOG1oKZweYe2yZNAGKuS1ifKkwY1QJGqAihDVQgW5LkwUR87Ypa2MUqRHEDVAFZXwWKKfv7/c6/n1+TcjTFymDXWDU+QMRMvdwJBjuOKqlWl5DGVZ+J1/NEMFlWorqa0lSREVeZ8NVMZLEWWx+ivVoci4MpsnEQ3BiShVUFIRAWUatF5Hu+hdYFXFdS8iuKXbtYlSmyXVoF0a22bZ9sPLKLLX8mO1dw8lyisRpaC2+ge/07tEGbrgEE6iVBQCucx5ROd4paA1UV6ArgseW3i0sREFR9mNKA+VirdV93h5gRDVei8tVISoNtpH4Z9ENLbzx2WExIxwolqoKlvX5phWIjvVMgpk2fohCFdKAhhyTqg2l9S5MosRraiUHxFhBcMLFbNYMQ0JHlFm9mxbN7x/SuZ4qHjAyA+1ayJpiYoHcAvvo5WCVRFloHZDQiE+K+PMIETNp99rEG33S/5qxQ21fKVCQkOJ8v6oJ5NhjX2UMn/MQeBKd7W0tJFC1dbQxexnOTuu698vtS6K2LIbZOjCsBGl5I9v4C/LENVCtRHtiqmf6FkKuw2cmnYZW7e9SBAq0gZkZrN1qQhDV+WqWLYJZhfIaKCLgqQXgXLMEC12rxknL6Zav6UbG5p64j3UGVXlj4FE8XBgrMfCH7mIzvdKRMVrCMkIFB0ViiV/Tln+KuIED8iut4xG6FstXdsoFM5umIZPdmFyjtrEhhDvZew+OiLCB9rDUQPhalacMM7S/+TMJkSdpn/UTGIvc5OnJAax8QR3RsxW9V5V1uc+RJ2Dai3MkD1PJYVgItVuRKOMxpnPgFYJt84lOvYTUFXiMpOOJLr8I64dzxyjzk03JIpgQ94ygaLHWGut5d0so/AJXDsT5kakkO8vo07huEo6xcAFv3Qpo/K4zFP1t4j/rEFZ2uIQ3eFSRtX+PiNABktKfITmels3JLVis9sItNG0MYeu5jjGXcASRC83xPwb9qgcBuep3vwlfgaWI6ZxDJrWkyveXXHGEBXt6UWX+6oYwsVEw3EOhXrtf+ybM4EOUfwDhMRglfmziLq2nPNjjQK7QpZL5cMEzuofAhPruY4np/MAAAAASUVORK5CYII="
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex h-screen w-full'>
            <div className='w-[560px] min-w-[560px] h-full relative'>
                <Image src={loginLogo} layout='fill' alt="loginLogo" />
            </div>
            <div className='flex justify-center items-center flex-col w-[62%]'>
                <div className='w-[360px]'>
                    <h6 className='text-[#000000] text-[30px] font-bold'>Log in to your account</h6>
                    <Form
                        name="basic"
                        layout="vertical"
                        labelCol={{
                            span: 9,
                        }}
                        wrapperCol={{
                            span: 15,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Account number"
                            name="accountNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your account number!',
                                },
                            ]}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input style={{ width: '100%', height: '46px' }} placeholder='account number' />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input.Password style={{ width: '100%', height: '46px' }} placeholder='Password' />
                        </Form.Item>

                        <Form.Item
                            label="Verification code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your verification code!',
                                },
                            ]}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Space direction="horizontal">
                                <Input style={{ width: '235px', height: '46px' }} placeholder='Verification code' />
                                <img src={code} style={{ height: '46px', width: '115px' }} alt="loginCode" />
                            </Space>
                        </Form.Item>
                        {/* <Link href="/#"><span className='text-[#2C4E93] text-[14px]'>Forgot password？</span></Link> */}
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button style={{ width: '100%', height: '46px', backgroundColor: '#1a1a1a', borderRadius: '10px' }} type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <span>Don’t have an account？</span>
                    <span className='text-[#2C4E93] font-bold cursor-pointer'>
                        <Link href="/register">Sign up</Link>
                    </span>
                </div>
            </div>


        </div>
    )
}