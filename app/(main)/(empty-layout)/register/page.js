

'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, Form, Input } from 'antd';
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

        alert('Success!')
    };
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
                    <h6 className='text-[#000000] text-[30px] font-bold'>Create new account</h6>
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
                            label="Email"
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input style={{ width: '100%', height: '46px' }} placeholder='email' />
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
                            <Input style={{ width: '100%', height: '46px' }} placeholder='Verification code' />

                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button style={{ width: '100%', height: '46px', backgroundColor: '#1a1a1a', borderRadius: '10px' }} type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <span>Already have an account？</span>
                    <span className='text-[#2C4E93] font-bold cursor-pointer'>
                        <Link href="/login">Log in</Link>
                    </span>
                </div>
            </div>


        </div>
    )
}