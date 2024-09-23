'use client'
import { ExchangeApi } from "@/app/service/exchange-api";
import { ExchangeDataType } from "@/app/service/exchange-api/type";
import { RealTradingApi } from "@/app/service/realTrading-api";
import { TAddGmxData, TGmxData, TGmxProfitDATA } from "@/app/service/realTrading-api/type";
import { UserApi } from "@/app/service/user-api";
import { UserDataType } from "@/app/service/user-api/type";
import { Form, Input, message, Modal, Select } from "antd"
import React from "react";
import { useCallback, useEffect, useState } from "react";

interface IAddLiveTrading {
  visible: boolean;
  onCancel: () => void;
  type?: string;
  data?: any;
}

const echangeTypeList = [
  {
    label: 'OKX',
    value: 'okx',
  },
  {
    label: 'Binance',
    value: 'binance',
  },
  {
    label: 'Huobi',
    value: 'huobi',
  },
  {
    label: 'Gate',
    value: 'gate',
  },
]

const BalancedStrategyList = [
  {
    label: '波动率大于该值就需要再平衡',
    value: '1',
  },
  {
    label: '价格差大于该值就需要再平衡',
    value: '2',
  },
  {
    label: '间隔周期',
    value: '3',
  },
]

export type LiveTradingTypeForm = Omit<TAddGmxData, 'userName' | 'exchangeType'>

const formdateReq = (values: LiveTradingTypeForm, exchangeList: ExchangeDataType[]): TAddGmxData => {
  return {
    ...values,
    exchangeType: exchangeList.find((item: any) => item.id === values.exchangeId)?.protocol,
  }
}

const _AddLiveTrading = (props: IAddLiveTrading) => {
  const { visible, type, data, onCancel } = props
  const [userList, setUserList] = useState<UserDataType[]>([])
  const [account, setAccount] = useState<string>('')
  const [exchangeList, setExchangeList] = useState<ExchangeDataType[]>([])

  const [form] = Form.useForm()

  const handleCancel = () => {
    form.resetFields()
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

  const queryUserExchange = useCallback(() => {
    if (account) {
      ExchangeApi.queryUserExchange({ account }).then((res: any) => {
        if (res) {
          setExchangeList(res.data)
        }
      })
    }
  }, [account])

  const addGmx = (values: LiveTradingTypeForm) => {
    const req = formdateReq(values, exchangeList)
    RealTradingApi.addGMX(req).then(() => {
      message.success('添加成功')
      handleCancel()
    })
  }

  const updateGmx = (values: LiveTradingTypeForm) => {
    const req = formdateReq(values, exchangeList)
    RealTradingApi.updateGmx({ ...req, id: data.id }).then(() => {
      message.success('修改成功')
      handleCancel()
    })
  }

  const onOk = () => {
    form.validateFields().then(values => {
      if (!data) {
        addGmx(values)
      } else {
        updateGmx(values)
      }
    })
  }

  const changeAcount = (value: string) => {
    const obj = userList.find((item) => item.id === Number(value))
    if (obj) {
      setAccount(obj.account)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  useEffect(() => {
    queryUserExchange()
  }, [queryUserExchange])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  return <Modal title={type === 'edit' ? '修改实盘' : '添加实盘'} style={{ width: 540 }} open={visible} onOk={onOk} onCancel={handleCancel}>
    <Form form={form} labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}>
      <Form.Item label="symbol" name="symbol" rules={[{
        required: true,
        message: '请输入symbol'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="用户" name="userId" rules={[{
        required: true,
        message: '请选择用户'
      }]}>
        <Select options={userList.map((item) => {
          return {
            label: item.name,
            value: item.id,
          }
        })} onChange={(value: string) => changeAcount(value)} />
      </Form.Item>
      <Form.Item label="交易所API" name="exchangeId" rules={[{
        required: true,
        message: '请输入交易所API'
      }]}>
        <Select options={exchangeList.map((item) => {
          return {
            label: item.protocol,
            value: item.id,
          }
        })} />
      </Form.Item>
      <Form.Item label="钱包地址" name="evmAddress" rules={[{
        required: true,
        message: '请输入钱包地址'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="本金" name="principal" rules={[{
        required: true,
        message: '请输入本金'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="GM数量" name="gmCount" rules={[{
        required: true,
        message: '请输入GM数量'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="协议总价值" name="gmInitValue" rules={[{
        required: true,
        message: '请输入协议总价值'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="开仓前空单价值" name="exchangeShortValue" rules={[{
        required: true,
        message: '请输入开仓前空单价值'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="杠杆倍数" name="leverageSlider" rules={[{
        required: true,
        message: '请输入杠杆倍数'
      }]}>
        <Input />
      </Form.Item>
      <Form.Item label="平衡策略" name="balancedStrategy">
        <Select options={BalancedStrategyList} />
      </Form.Item>
    </Form>
  </Modal>
}

export const AddLiveTrading = React.memo(_AddLiveTrading)