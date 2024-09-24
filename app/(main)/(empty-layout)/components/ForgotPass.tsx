'use client'

import { validateFormItem } from "@/utils/validator";
import { Button, Form, Input, Image } from "antd";
import BackSvg from '/public/static/icons/back-dark.svg'
import { useState } from "react";
import { useTimeout } from "ahooks";

interface ILogin {
  onCheck: (value: string) => void;
  onFinish: any;
  onFinishFailed: any;
  onSendEmail?: (value: string) => void;
}

export default function ForgotPass(props: ILogin) {
  const { onCheck, onFinish, onFinishFailed, onSendEmail } = props;
  const [form] = Form.useForm()
  const [sendDisabled, setSendDisabled] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | undefined>()


  const validateConFirmPassword = () => ({
    validator(rule: any, value: any) {
      if (!value) {
        return Promise.reject('Please input your confirm password!');
      }
      if (!value || form.getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords that you entered do not match!');
    }
  })

  const onSend = () => {
    const userEmail = form.getFieldValue('userEmail')
    if (onSendEmail && userEmail) {
      onSendEmail(userEmail)
      setSendDisabled(true)
      setDelay(60)
    }
  }

  useTimeout(() => {
    if (sendDisabled) {
      setSendDisabled(false)
      setDelay(undefined)
    }
  }, delay ? delay * 1000 : undefined)



  return (
    <div className="w-[62%] h-full relative">
      <div className="text-sm flex font-bold absolute left-12 top-10 cursor-pointer" onClick={() => onCheck('/login')}>
        <BackSvg className="inline-block w-6 mr-2" />
        back</div>
      <div className='flex justify-center items-center flex-col w-full h-full'>

        <div className='w-[360px]'>
          <h6 className='text-[#000000] text-[30px] font-bold mb-8'>
            Reset Password
          </h6>
          <Form
            name="basic"
            form={form}
            className={'login-form'}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="userEmail"
              rules={[
                () => validateFormItem('email', 'Please enter a valid email')
              ]}
            >
              <Input.Search
                placeholder="Please input your email!"
                allowClear
                enterButton={<Button disabled={sendDisabled} type="primary">Send Email</Button>}
                size="large"
                onSearch={onSend}
              />
            </Form.Item>

            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password style={{ width: '100%', height: '46px' }} placeholder='New password' />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              rules={[
                validateConFirmPassword
              ]}
            >
              <Input.Password style={{ width: '100%', height: '46px' }} placeholder='Confirm password' />
            </Form.Item>
            <Form.Item
              label="emailValidCode"
              name="emailValidCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your emailValidCode!',
                },
              ]}
            >
              <Input
                style={{ width: '100%', height: '46px' }}
                placeholder="Please input your emailValidCode!"
              />
            </Form.Item>
            <Form.Item
              className="mt-12"
            >
              <Button style={{ width: '100%', height: '46px', backgroundColor: '#1a1a1a', borderRadius: '10px' }} type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}