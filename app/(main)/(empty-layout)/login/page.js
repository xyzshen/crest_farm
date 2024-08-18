'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Form, Input } from 'antd';
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


        router.push('/#')

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex h-screen w-full'>

            <div className='w-[38%] min-h-[780px]'>
                <Image src={loginLogo} height={780} alt="loginLogo" />
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
                            <Input style={{ width: '100%', height: '46px' }} placeholder='Verification code' />

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