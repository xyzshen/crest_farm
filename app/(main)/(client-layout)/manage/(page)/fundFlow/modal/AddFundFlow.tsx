'use client'
import { FundFlowApi } from "@/app/service/fundFlow-api";
import { EAssetsType } from "@/app/service/fundFlow-api/type";
import { UserApi } from "@/app/service/user-api";
import { UserDataType } from "@/app/service/user-api/type";
import { enumToArray } from "@/utils";
import { Form, Input, message, Modal, Select } from "antd"
import React from "react";
import { useCallback, useEffect, useState } from "react";

interface IAddDividendRecord {
  visible: boolean;
  onCancel: () => void;
}

const _AddFundFlow = (props: IAddDividendRecord) => {
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
      FundFlowApi.addFundFlow(values).then(() => {
        message.success('添加成功')
        handleCancel()
      })
    })
  }

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  return <Modal title="新增资金流水" open={visible} onCancel={handleCancel} onOk={onOk}>
    <Form form={form} >
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
      <Form.Item label="金额" name="amount" rules={[{
        required: true,
        message: '请输入分红金额'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="操作类型" name="type" rules={[{
        required: true,
        message: '请输选择分红类型'
      }]}>
        <Select options={enumToArray(EAssetsType)} />
      </Form.Item>
    </Form>
  </Modal>
}

export const AddFundFlow = React.memo(_AddFundFlow)