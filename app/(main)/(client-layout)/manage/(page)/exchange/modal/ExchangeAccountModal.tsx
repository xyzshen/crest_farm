'use client'

import { Form, Input, message, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ExchangeApi } from "@/app/service/exchange-api";
import { UserDataType } from "@/app/service/user-api/type";
import { UserApi } from "@/app/service/user-api";
import { ExchangeDataType, TAddExchangeData, TUpdateExchangeData } from "@/app/service/exchange-api/type";

interface IExchangeAccountModal {
  visible: boolean;
  data?: ExchangeDataType;
  onCancel: () => void;
}

const exchangeOptions = [
  { label: 'OKX', value: 'okx' },
  { label: 'Binance', value: 'binance' },
  { label: 'Huobi', value: 'huobi' },
  { label: 'Gate', value: 'gate' },
]

const ExchangeAccountModal = (props: IExchangeAccountModal) => {
  const { visible, data, onCancel } = props
  const [form] = Form.useForm()
  const [userList, setUserList] = useState<UserDataType[]>([])
  const [exchange, setExchange] = useState<string>('')

  const fetchUserList = useCallback(() => {
    const query = {
      pageNumber: 1,
      pageSize: 10000
    }
    UserApi.getUserInfo(query).then((res: any) => {
      if (res) {
        setUserList(res.data || [])
      }
    })
  }, [])

  const onAddExchange = (values: TAddExchangeData) => {
    ExchangeApi.addExchange(values).then((res: any) => {
      message.success('新增成功')
      handleCancle()
    })
  }

  const onUpdateExchange = (values: TUpdateExchangeData) => {
    ExchangeApi.updateExchange(values).then((res: any) => {
      message.success('修改成功')
      handleCancle()
    })
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      if (!data) {
        onAddExchange({
          ...values,
          commodity: "features",
          tag: 'tag'
        })
      } else {
        onUpdateExchange({
          id: data.id,
          ...values,
          commodity: "features",
          tag: 'tag'
        })
      }
    })
  }



  const handleCancle = () => {
    form.resetFields()
    onCancel()
  }

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        account: data.account,
        protocol: data.protocol,
        accessKey: data.accessKey,
        accessSecret: data.accessSecret,
        phasePassword: data.phasePassword || '',
      })
      if (data.protocol === 'okx') {
        setExchange('okx')
      }
    }
  }, [data])

  return <Modal open={visible} onCancel={handleCancle} onOk={handleOk} title={data ? "新增交易所账号" : "修改交易所账号"}>
    <Form form={form} labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}>
      <Form.Item label="账号" name="account">
        <Select options={userList.map(item => {
          return {
            label: item.name,
            value: item.account
          }
        })} />
      </Form.Item>
      <Form.Item label="所属交易所" name="protocol">
        <Select options={exchangeOptions} onChange={(value) => {
          setExchange(value)
        }} />
      </Form.Item>
      <Form.Item label="API Key" name="accessKey">
        <Input />
      </Form.Item>
      <Form.Item label="Secret Key" name="accessSecret">
        <Input />
      </Form.Item>
      {exchange === 'okx' && <Form.Item label="phasePassword" name="phasePassword">
        <Input />
      </Form.Item>}
      <Form.Item label="IP 白名单" name="whiteListIp">
        <Input.TextArea placeholder="使用逗号分隔ip" />
      </Form.Item>
    </Form>
  </Modal>
}

export default ExchangeAccountModal;