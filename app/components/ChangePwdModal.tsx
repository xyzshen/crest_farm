import { validateFormItem } from "@/utils/validator";
import { Form, Input, message, Modal } from "antd"
import { AccountApi } from "../service/account-api";

interface IChangePwdModal {
  visible: boolean;
  onCancel: () => void;
}

const ChangePwdModal = (props: IChangePwdModal) => {
  const { visible, onCancel } = props

  const [form] = Form.useForm()

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

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      AccountApi.updatePassword(values).then((res: any) => {
        if (res) {
          message.success('Change Successful')
          handleCancel()
        }
      })
    })
  }


  return <Modal title="修改密码" open={visible} onCancel={handleCancel} onOk={handleOk} >
    <Form
      requiredMark={false}
      className={'login-form'}
      name="basic"
      form={form}
      layout="vertical">
      <Form.Item label="原密码" name="oldPassword" rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        () => validateFormItem('password', 'The length must exceed 8 characters and must contain both letters and numbers.')
      ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="新密码" name="newPassword" rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        () => validateFormItem('password', 'The length must exceed 8 characters and must contain both letters and numbers.')
      ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="确认新密码" name="confirmPassword" rules={[
        validateConFirmPassword
      ]}>
        <Input.Password />
      </Form.Item>
    </Form>
  </Modal>
}

export default ChangePwdModal