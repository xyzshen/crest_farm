import { Table } from "antd"
import DetailItem from "./DetailItem"
import { formatDecimal } from "@/utils"

interface IShort {
  data: any
}

const Short = (props: IShort) => {
  const { data } = props
  const columns = [
    {
      title: '交易对',
      dataIndex: 'symbol',
    },
    {
      title: '持仓成本价',
      dataIndex: 'entryPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '初始保证金',
      dataIndex: 'initialMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '保证金',
      dataIndex: 'maintMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓所需起始保证金',
      dataIndex: 'positionInitialMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '开仓均价',
      dataIndex: 'entryPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '盈亏平衡价',
      dataIndex: 'breakEvenPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '参考强平价格',
      dataIndex: 'liquidationPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '是否逐仓',
      dataIndex: 'isolated',
      render: (text: string) => {
        return text ? '是' : '否'
      }
    },
    {
      title: '杠杆倍率',
      dataIndex: 'leverage',
    },
    {
      title: '价值',
      dataIndex: 'notional',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓数量',
      dataIndex: 'positionAmt',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓方向',
      dataIndex: 'positionSide',
    },
    {
      title: '持仓未实现盈亏',
      dataIndex: 'unrealizedProfit',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
  ]
  return <div className=" bg-white  rounded-md p-6 mb-6">
    <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">空单信息</div>
    <div className="w-full py-6  flex flex-wrap items-center justify-between  border-1 rounded-md">
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} />
    </div>
  </div>
}

export default Short