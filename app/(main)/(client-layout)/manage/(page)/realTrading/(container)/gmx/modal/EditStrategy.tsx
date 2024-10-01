'use client'
import { TGmxData } from "@/app/service/realTrading-api/type";
import { Form, Modal } from "antd"

interface EditStrategyProps {
  type: string;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  statics: TGmxData
}
// const statics = {
//   symbol: 'PEPE-USDC',
//   userName: 'USER1',
//   address: '0x12345678904556654765765765765765',
//   gmCount: 67000,
//   principal: 100000,
//   profit: 5000,
//   exchangeType: 'okx',
//   startTime: '2024-08-28 12:00:00',
//   exchangeId: 1,
//   balancedStrategy: 1,
//   gmInitValue: 67000,
//   exchangeShortValue: 33000,
//   leverageSlider: 2
// }

const EditStrategy = (props: EditStrategyProps) => {
  const { visible, type, statics, onCancel, onOk } = props
  return <Modal open={visible} title={type === 'start' ? '启动策略' : '停止策略'} onCancel={onCancel} onOk={onOk}>
    <Form>
      <Form.Item label="symbol">
        <span>{statics.symbol}</span>
      </Form.Item>
      <Form.Item label="用户">
        <span>{statics.userName}</span>
      </Form.Item>
      <Form.Item label="钱包地址">
        <span>{statics.evmAddress}</span>
      </Form.Item>
      <Form.Item label="交易所类型">
        <span>{statics.exchangeType}</span>
      </Form.Item>
      <Form.Item label="交易所APP ID">
        <span>{statics.exchangeId}</span>
      </Form.Item>
      <Form.Item label="本金">
        <span>{statics.principal}</span>
      </Form.Item>
      <Form.Item label="总收益">
        <span>{statics.profit}</span>
      </Form.Item>
      <Form.Item label="gm数量">
        <span>{statics.gmCount}</span>
      </Form.Item>
      <Form.Item label="协议价值">
        <span>{statics.gmInitValue}</span>
      </Form.Item>
      <Form.Item label="空单价值">
        <span>{statics.exchangeShortValue}</span>
      </Form.Item>
      <Form.Item label="杠杆倍数">
        <span>{statics.leverageSlider}</span>
      </Form.Item>
    </Form>
  </Modal>
}

export default EditStrategy;