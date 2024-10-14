import { formatDecimal, formatTimeToTz } from '@/utils';
import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const Position = (props: any) => {
  const { tableProps, data } = props;
  const columns = [
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
        return formatDecimal(data.principal, 4)
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
      title: '协议token数量',
      dataIndex: 'tokenCount',
      key: 'tokenCount',
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
      title: '空单token价格',
      dataIndex: 'shortTokenValue',
      key: 'shortTokenValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'token空单数量',
      dataIndex: 'shortCount',
      key: 'shortCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'USDC数量',
      dataIndex: 'usdtCount',
      key: 'usdtCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '资金费率',
      dataIndex: 'fundFee',
      key: 'fundFee',
      render: (text: any) => {
        return text ? (text * 100).toFixed(2) + '%' : 0
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
    {
      title: '实时收益',
      dataIndex: 'periodProfit',
      key: 'periodProfit',
      render: (text: string) => {
        return formatDecimal(text, 8)
      }
    },
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
  return <Table columns={columns} rowKey="id" {...tableProps} pagination={false} />
}

export default Position;