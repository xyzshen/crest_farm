import { formatDecimal, formatTimeToTz } from '@/utils';
import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const Position = (props: any) => {
  const { tableProps, data } = props;
  const columns = [
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => {
        return formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: 'Principal',
      dataIndex: 'principal',
      key: 'principal',
      render: (text: string) => {
        return formatDecimal(data.principal, 4)
      }
    },
    {
      title: 'Protocol Value',
      dataIndex: 'protocolValue',
      key: 'protocolValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Token Count',
      dataIndex: 'tokenCount',
      key: 'tokenCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Account Balance',
      dataIndex: 'accountBalance',
      key: 'accountBalance',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Short Token Value',
      dataIndex: 'shortTokenValue',
      key: 'shortTokenValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Token Price',
      dataIndex: 'tokenPrice',
      key: 'tokenPrice',
      render: (text: string) => {
        return formatDecimal(text, 6)
      }
    },
    {
      title: 'USDT Count',
      dataIndex: 'usdtCount',
      key: 'usdtCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Funding Rate',
      dataIndex: 'fundFee',
      key: 'fundFee',
      render: (text: any) => {
        return text ? (text * 100).toFixed(2) + '%' : 0
      }
    },
    {
      title: 'Open fee',
      dataIndex: 'openFee',
      key: 'openFee',
      render: (text: string) => {
        return formatDecimal(text, 6)
      }
    },
    {
      title: 'Current Profit',
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
  return <Table columns={columns} rowKey="id" {...tableProps} />
}

export default Position;