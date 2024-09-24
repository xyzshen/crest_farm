import { Button, Form, Input, Space, Image } from "antd";
import BackSvg from '/public/static/icons/back-dark.svg'

interface ILogin {
  code: string;
  onFinish: any;
  onFinishFailed: any;
  onCheck?: (value: string) => void;
  onChangePictureCheckCode: () => void;
}

export default function LoginComponent(props: ILogin) {
  const { code, onFinish, onChangePictureCheckCode, onFinishFailed, onCheck, } = props;

  const onRoute = () => {
    onCheck?.('/')
  }

  return (
    <div className='flex justify-center items-center flex-col w-[62%] relative'>
      <div className="text-sm font-bold absolute left-12 top-10 cursor-pointer" onClick={() => onRoute()}>
        <BackSvg className="inline-block w-6 mr-2" />
        back
      </div>
      <div className='w-[360px]'>
        <h6 className='text-[#000000] text-[30px] font-bold mb-8'>Log in to your account</h6>
        <Form
          className={'login-form'}
          name="basic"
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
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
          >
            <Space direction="horizontal">
              <Input style={{ width: '235px', height: '46px' }} placeholder='Verification code' />
              <img onClick={onChangePictureCheckCode} className="curpor-pointer" src={code} style={{ height: '46px', width: '115px' }} alt="loginCode" />
            </Space>
          </Form.Item>
          <Form.Item
            className="mt-4"
          >
            <div className="float-right text-blue-600 text-sm cursor-pointer" onClick={() => onCheck?.('forgot')}>Forgot password？</div>
          </Form.Item>
          <Form.Item
            className="mt-4"
          >
            <Button style={{ width: '100%', height: '46px', backgroundColor: '#1a1a1a', borderRadius: '10px' }} type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <span>Don’t have an account？</span>
        <span className='text-[#2C4E93] font-bold cursor-pointer' onClick={() => onCheck?.('/register')}>
          Sign up
        </span>
      </div>
    </div>
  )
}