import { fundDistributionApi } from "@/service/fundDistribution-api";
import { IFundDistribution } from "@/service/fundDistribution-api/type";
import { UserApi } from "@/service/user-api"
import { UserDataType } from "@/service/user-api/type"
import { DatePicker, Form, Input, InputNumber, message, Modal, Select } from "antd"
import { useCallback, useEffect, useState } from "react"

interface IAssetsManageModal {
  visible: boolean;
  data?: IFundDistribution;
  onCancel: () => void
}

const AssetsManageModal = (props: IAssetsManageModal) => {
  const { visible, onCancel, data } = props
  const [form] = Form.useForm()

  const [userList, setUserList] = useState<UserDataType[]>([])

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }
  const handleOk = () => {
    form.validateFields().then(values => {
      const query = {
        ...values
      }
      if (data) {
        fundDistributionApi.modFundDistribution({
          ...query,
          id: data.id
        }).then(() => {
          message.success('修改成功')
          handleCancel()
        })
      } else {
        fundDistributionApi.addFundDistribution(query).then(() => {
          message.success('添加成功')
          handleCancel()
        })
      }
    })
  }

  const fetchUserList = useCallback(() => {
    const query = {
      pageNumber: 1,
      pageSize: 1000,
    }
    UserApi.getUserInfo(query).then((res: any) => {
      if (res) {
        setUserList(res.data)
      }
    })
  }, [])

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  return <Modal title="添加资产" open={visible} onOk={handleOk} onCancel={handleCancel}>
    <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="账号" name="account" rules={[{
        required: true,
        message: '请选择账号'
      }]}>
        <Select placeholder="请选择账号" options={userList.map(item => {
          return {
            label: item.account,
            value: item.account
          }
        })} />
      </Form.Item>
      <Form.Item label="本金" name="amount" rules={[{
        required: true,
        message: '请输入策略'
      }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="策略" name="strategy" rules={[{
        required: true,
        message: '请输入策略'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="地址" name="address" rules={[{
        required: true,
        message: '请输入地址'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="平台" name="platform" rules={[{
        required: true,
        message: '请输入平台'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="时间" name="moneyDate" rules={[{
        required: true,
        message: '请输入时间'
      }]}>
        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="备注" name="description">
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal>
}

export default AssetsManageModal