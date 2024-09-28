import { formatDecimal } from '@/utils';
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
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
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
      title: 'LP Value',
      dataIndex: 'LPValue',
      key: 'LPValue',
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
      title: 'USDT Count',
      dataIndex: 'usdtCount',
      key: 'usdtCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'GM Price',
      dataIndex: 'gmPrice',
      key: 'gmPrice',
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
      dataIndex: 'fundFee',
      key: 'fundFee',
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
      title: 'Total Profit',
      dataIndex: 'totalProfit',
      key: 'totalProfit',
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