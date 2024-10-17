
'use cilent'
import { formatDecimal, formatTimeToTz } from '@/utils';
import { Table } from 'antd';
import React, { useMemo } from 'react';

const Position = (props: any) => {
  const { tableProps, data, token0 = 'token' } = props;
  const columns = useMemo(() => {
    return [
      {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text: string) => {
          return formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '本金',
        dataIndex: 'principal',
        key: 'principal',
        render: (text: string) => {
          return formatDecimal(data?.principal || 0, 4)
        }
      },
      {
        title: '协议价值',
        dataIndex: 'protocolValue',
        key: 'protocolValue',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: `协议${token0}数量`,
        dataIndex: 'tokenCount',
        key: 'tokenCount',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: '协议中USDC数量',
        dataIndex: 'usdtCount',
        key: 'usdtCount',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: '合约账户余额',
        dataIndex: 'accountBalance',
        key: 'accountBalance',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: `${token0}空单价值`,
        dataIndex: 'shortTokenValue',
        key: 'shortTokenValue',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: `${token0}价格`,
        dataIndex: 'tokenPrice',
        key: 'tokenPrice',
        render: (text: string) => {
          return formatDecimal(text, 6)
        }
      },
      {
        title: `${token0}空单数量`,
        dataIndex: 'shortCount',
        key: 'shortCount',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      // {
      //   title: 'GM价格',
      //   dataIndex: 'gmPrice',
      //   key: 'gmPrice',
      //   render: (text: string) => {
      //     return formatDecimal(text, 4)
      //   }
      // },
      {
        title: '资金费率',
        dataIndex: 'fundFee',
        key: 'fundFee',
        render: (text: any) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: '开单消耗',
        dataIndex: 'openFee',
        key: 'openFee',
        render: (text: string) => {
          return formatDecimal(text, 6)
        }
      },
      // {
      //   title: '实时收益',
      //   dataIndex: 'periodProfit',
      //   key: 'periodProfit',
      //   render: (text: string) => {
      //     return formatDecimal(text, 8)
      //   }
      // },
      {
        title: '总收益',
        dataIndex: 'currentProfit',
        key: 'currentProfit',
        render: (text: string) => {
          return formatDecimal(text, 4)
        }
      },
      {
        title: 'APY',
        dataIndex: 'currentApy',
        render: (text: string) => {
          return text ? formatDecimal(text, 4) + '%' : 0
        }
      }
    ]
  }, [token0])

  return <Table columns={columns} rowKey="id" {...tableProps} pagination={false} />
}

export default Position;