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
      title: '用户',
      dataIndex: 'account',
    },
    {
      title: '交易所别名',
      dataIndex: 'alias',
    },
    {
      title: '交易对',
      dataIndex: 'symbol',
    },
    {
      title: '交易所',
      dataIndex: 'exchange',
    },
    {
      title: '持仓方向',
      dataIndex: 'positionSide',
      render: (text: string, record: any) => {
        return record?.positionAmt < 0 ? '空' : '多'
      }
    },
    {
      title: '合约账户余额',
      dataIndex: 'balance',
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
      title: '保证金',
      dataIndex: 'margin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '杠杆倍率',
      dataIndex: 'leverage',
    },
    {
      title: '开仓均价',
      dataIndex: 'entryPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '标记价格',
      dataIndex: 'markPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '资金费率',
      dataIndex: 'fundFee',
      render: (text: string) => {
        return formatDecimal(text, 6)
      }
    },
    {
      title: '开仓费用',
      dataIndex: 'openFee',
      render: (text: string) => {
        return formatDecimal(text, 6)
      }
    },
    {
      title: '收益额',
      dataIndex: 'unrealizedProfit',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '收益率',
      dataIndex: 'profitRate',
      render: (text: string) => {
        return formatDecimal(text, 6, 100) + '%'
      }
    },

    // {
    //   title: '持仓成本价',
    //   dataIndex: 'entryPrice',
    //   render: (text: string) => {
    //     return formatDecimal(text, 6)
    //   }
    // },
    // {
    //   title: '初始保证金',
    //   dataIndex: 'initialMargin',
    //   render: (text: string) => {
    //     return formatDecimal(text, 4)
    //   }
    // },

    // {
    //   title: '持仓所需起始保证金',
    //   dataIndex: 'positionInitialMargin',
    //   render: (text: string) => {
    //     return formatDecimal(text, 4)
    //   }
    // },

    // {
    //   title: '盈亏平衡价',
    //   dataIndex: 'breakEvenPrice',
    //   render: (text: string) => {
    //     return formatDecimal(text, 4)
    //   }
    // },
    // {
    //   title: '参考强平价格',
    //   dataIndex: 'liquidationPrice',
    //   render: (text: string) => {
    //     return formatDecimal(text, 4)
    //   }
    // },
    // {
    //   title: '是否逐仓',
    //   dataIndex: 'isolated',
    //   render: (text: string) => {
    //     return text ? '是' : '否'
    //   }
    // },

    // {
    //   title: '价值',
    //   dataIndex: 'notional',
    //   render: (text: string) => {
    //     return formatDecimal(text, 4)
    //   }
    // },
  ]

  return <div className=" bg-white  rounded-md p-6 mb-6">
    <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">空单信息</div>
    <div className="w-full py-6   border-1 rounded-md">
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} />
    </div>
  </div>
}

export default Short