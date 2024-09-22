'use client'
import { DividendRecordApi } from "@/app/service/dividendRecord-api";
import { UserApi } from "@/app/service/user-api";
import { UserDataType } from "@/app/service/user-api/type";
import { Form, Input, message, Modal, Select } from "antd"
import { useCallback, useEffect, useState } from "react";

interface IAddDividendRecord {
  visible: boolean;
  onCancel: () => void;
}

const AddDividendRecord = (props: IAddDividendRecord) => {
  const { visible, onCancel } = props

  const [userList, setUserList] = useState<UserDataType[]>([])

  const [form] = Form.useForm()

  const handleCancel = () => {
    onCancel()
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

  const onOk = () => {
    form.validateFields().then(values => {
      DividendRecordApi.addDividendRecord(values).then(() => {
        message.success('添加成功')
        handleCancel()
      })
    })
  }

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  return <Modal title="新增分红" open={visible} onCancel={handleCancel} onOk={onOk}>
    <Form form={form}>
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
      <Form.Item label="分红金额" name="amount" rules={[{
        required: true,
        message: '请输入分红金额'
      }]}>
        <Input />
      </Form.Item>
    </Form>
  </Modal>
}

export default AddDividendRecord