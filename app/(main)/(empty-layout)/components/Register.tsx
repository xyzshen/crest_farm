'use cilent';
import { Button, Form, Input, Space } from "antd";
import { validateFormItem } from "@/utils/validator";
import { useState } from "react";
import { useInterval, useTimeout } from "ahooks";

interface ILogin {
  code: string;
  onFinish: any;
  onFinishFailed: any;
  onCheck: (value: string) => void;
  onChangePictureCheckCode: () => void;
  onSendEmail?: (value: string) => void;
}

export default function Register(props: ILogin) {
  const { code, onFinish, onChangePictureCheckCode, onFinishFailed, onCheck, onSendEmail } = props;
  const [form] = Form.useForm();
  const [sendDisabled, setSendDisabled] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | undefined>()

  const validateConFirmPassword = () => ({
    validator(rule: any, value: any) {
      if (!value) {
        return Promise.reject('Please input your confirm password!');
      }
      if (!value || form.getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords that you entered do not match!');
    }
  })
  const onSend = () => {
    const email = form.getFieldValue('email')
    if (onSendEmail && email) {
      onSendEmail(email)
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
    <div className='flex justify-center items-center flex-col w-[62%]'>
      <div className='w-[360px]'>
        <h6 className='text-[#000000] text-[30px] font-bold mb-8'>Create new account</h6>
        <Form
          className={'login-form'}
          name="basic"
          form={form}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[
              {
                required: true,
                message: 'Please input your account!',
              },
            ]}
          >
            <Input style={{ width: '100%', height: '46px' }} placeholder='account' />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              () => validateFormItem('email', 'Please enter a valid email')
            ]}
          >
            <Input.Search
              placeholder="Please input your email!"
              allowClear
              enterButton={<Button onClick={onSend} disabled={sendDisabled} type="primary">Send Email</Button>}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              () => validateFormItem('password', '长度超过8位，必须要有英文和数字')
            ]}
          >
            <Input.Password style={{ width: '100%', height: '46px' }} placeholder='Password' />
          </Form.Item>
          <Form.Item
            label="ConfirmPassword"
            name="confirmPassword"
            rules={[
              validateConFirmPassword
            ]}
          >
            <Input.Password style={{ width: '100%', height: '46px' }} placeholder='Password' />
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
            label="Verification code"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your verification code!',
              },
            ]}
          >
            <Space direction="horizontal">
              <Input style={{ width: '235px', height: '46px' }} size="large" placeholder='Verification code' />
              <img onClick={onChangePictureCheckCode} className="curpor-pointer" src={code} style={{ height: '46px', width: '115px' }} alt="loginCode" />
            </Space>
          </Form.Item>
          <Form.Item
            className="mt-4"
          >
            <Button style={{ width: '100%', height: '46px', backgroundColor: '#1a1a1a', borderRadius: '10px' }} type="primary" htmlType="submit">
              register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <span>You have a account？ </span>
        <span className='text-[#2C4E93] font-bold cursor-pointer' onClick={() => onCheck?.('/login')}>
          Login in
        </span>
      </div>
    </div>
  )
}