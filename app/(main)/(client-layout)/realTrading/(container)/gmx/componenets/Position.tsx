import { formatDecimal } from '@/utils';
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
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
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
      dataIndex: 'LPValue',
      key: 'LPValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'token空单价值',
      dataIndex: 'shortTokenValue',
      key: 'shortTokenValue',
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
      title: 'GM价格',
      dataIndex: 'gmPrice',
      key: 'gmPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '资金费率',
      dataIndex: 'fundingRate',
      key: 'fundingRate',
      render: (text: any) => {
        return text ? (text * 100).toFixed(2) + '%' : 0
      }
    },
    {
      title: '开单消耗',
      dataIndex: 'fee',
      key: 'fee',
      render: (text: string) => {
        return formatDecimal(text, 6)
      }
    },
    {
      title: '实时收益',
      dataIndex: 'currentProfit',
      key: 'currentProfit',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '总收益',
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